package services

import (
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
)

type sessionStateMessage struct {
	sessionID string
	state     interface{}
}

type SessionStore struct {
	chanSessionGetState chan sessionStateMessage
	chanSessionSetState chan sessionStateMessage
}

const cookieName = "session"

func NewSessionStore() (s *SessionStore, err error) {
	s = &SessionStore{
		chanSessionGetState: make(chan sessionStateMessage),
		chanSessionSetState: make(chan sessionStateMessage),
	}
	go s.run()
	return
}

func (s *SessionStore) run() {
	sessions := map[string]interface{}{}
	for {
		select {
		case ssm := <-s.chanSessionSetState:
			if ssm.state == nil {
				delete(sessions, ssm.sessionID)
				continue
			}
			sessions[ssm.sessionID] = ssm.state
		case ssm := <-s.chanSessionGetState:
			state, _ := sessions[ssm.sessionID]
			s.chanSessionGetState <- sessionStateMessage{
				sessionID: ssm.sessionID,
				state:     state,
			}
		case <-time.After(time.Minute):
			fmt.Println("gc for session states")
		}
	}
}

func (s *SessionStore) GetState(r *http.Request) (state interface{}, err error) {
	cookie, errCookie := r.Cookie(cookieName)
	if errCookie != nil {
		err = errCookie
		return
	}
	s.chanSessionGetState <- sessionStateMessage{
		sessionID: cookie.Value,
	}
	ssm := <-s.chanSessionGetState
	state = ssm.state
	return
}

func (s *SessionStore) SetState(w http.ResponseWriter, r *http.Request, state interface{}) (err error) {
	sid := ""
	cookie, errCookie := r.Cookie(cookieName)
	if errCookie != nil {
		sessionID, errSessionID := uuid.NewRandom()
		if errSessionID != nil {
			err = errSessionID
			return
		}
		sid = sessionID.String()
		http.SetCookie(w, &http.Cookie{
			HttpOnly: true,
			Path:     "/",
			Expires:  time.Now().Add(time.Hour * 100),
			Value:    sid,
		})
	} else {
		sid = cookie.Value
	}
	s.chanSessionSetState <- sessionStateMessage{
		sessionID: sid,
		state:     state,
	}
	return
}
