package services

import (
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/janhalfar/vocablion/redux"
)

type sessionStateMessage struct {
	sessionID string
	store     *redux.Store
}

type SessionStore struct {
	storeCreator        redux.StoreCreator
	chanSessionGetState chan sessionStateMessage
	chanSessionSetState chan sessionStateMessage
}

const cookieName = "session"

func NewSessionStore(storeCreator redux.StoreCreator) (s *SessionStore, err error) {
	s = &SessionStore{
		chanSessionGetState: make(chan sessionStateMessage),
		chanSessionSetState: make(chan sessionStateMessage),
		storeCreator:        storeCreator,
	}
	go s.run()
	return
}

func (s *SessionStore) run() {
	sessions := map[string]*redux.Store{}
	for {
		select {
		case ssm := <-s.chanSessionSetState:
			if ssm.store == nil {
				delete(sessions, ssm.sessionID)
				continue
			}
			sessions[ssm.sessionID] = ssm.store
		case ssm := <-s.chanSessionGetState:
			store, _ := sessions[ssm.sessionID]
			s.chanSessionGetState <- sessionStateMessage{
				sessionID: ssm.sessionID,
				store:     store,
			}
		case <-time.After(time.Minute):
			fmt.Println("gc for session states")
		}
	}
}

func castErr(e error) (err *ServiceError) {
	switch e.(type) {
	case *ServiceError:
		err = e.(*ServiceError)
	default:
		err = InternalErr(e)
	}
	return
}
func (s *SessionStore) Dispatch(
	w http.ResponseWriter,
	r *http.Request,
	action interface{},
) (
	newState map[string]interface{},
	err *ServiceError,
) {
	_, reduxStore, errInit := s.init(w, r)
	if errInit != nil {
		err = castErr(errInit)
		return
	}
	errDispatch := reduxStore.Dispatch(action)
	if errDispatch != nil {
		err = castErr(errDispatch)
		return
	}
	newState = reduxStore.GetState()
	return
}

func (s *SessionStore) init(
	w http.ResponseWriter,
	r *http.Request,
) (state interface{}, store *redux.Store, err error) {
	cookie, errCookie := r.Cookie(cookieName)
	if errCookie != nil && errCookie != http.ErrNoCookie {
		err = errCookie
		return
	}
	sessionID := ""
	if cookie != nil {
		sessionID = cookie.Value
	}
	s.chanSessionGetState <- sessionStateMessage{
		sessionID: sessionID,
	}
	ssm := <-s.chanSessionGetState
	if ssm.store != nil {
		store = ssm.store
	} else {
		newStore, errCreate := s.storeCreator()
		if errCreate != nil {
			err = errCreate
			return
		}
		store = newStore
		errSet := s.set(w, r, store)
		if errSet != nil {
			err = errSet
			return
		}
	}
	state = store.GetState()
	return
}

func (s *SessionStore) set(w http.ResponseWriter, r *http.Request, store *redux.Store) (err error) {
	sid := ""
	cookie, errCookie := r.Cookie(cookieName)
	if errCookie != nil {
		sessionID, errSessionID := uuid.NewRandom()
		if errSessionID != nil {
			err = errSessionID
			return
		}
		sid = sessionID.String()
		c := &http.Cookie{
			Name:     cookieName,
			HttpOnly: true,
			Path:     "/",
			Expires:  time.Now().Add(time.Hour * 100),
			Value:    sid,
		}
		http.SetCookie(w, c)
	} else {
		sid = cookie.Value
	}
	s.chanSessionSetState <- sessionStateMessage{
		sessionID: sid,
		store:     store,
	}
	return
}
