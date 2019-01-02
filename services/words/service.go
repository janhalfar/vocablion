package words

import (
	"errors"
	http "net/http"

	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/persistence"
	"github.com/janhalfar/vocablion/services"
)

type Service struct {
	sessionStore *services.SessionStore
	eventsStore  *events.Store
}

const StoreKey = "words"

func NewService(
	p *persistence.P,
	eventsStore *events.Store,
	sessionStore *services.SessionStore,
) (s *Service, err error) {
	s = &Service{
		sessionStore: sessionStore,
		eventsStore:  eventsStore,
	}
	eventsStore.Subscribe([]events.Type{}, eventsSubscriber(p))
	return
}

func (s *Service) sessionDispatch(
	w http.ResponseWriter,
	r *http.Request,
	action interface{},
) (newState WordsState, err *services.ServiceError) {
	newStateMap, e := s.sessionStore.Dispatch(w, r, action)
	if e != nil {
		err = e
	}

	newStateInterface, ok := newStateMap[StoreKey]
	if !ok {
		err = &services.ServiceError{Message: "store state is missing: " + StoreKey}
		return
	}
	switch newStateInterface.(type) {
	case WordsState:
		newState = newStateInterface.(WordsState)
	default:
		err = services.InternalErr(errors.New("new state type error"))
		return
	}
	return
}

func (s *Service) Search(
	w http.ResponseWriter,
	r *http.Request,
	query string,
) (state WordsState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionSearch{Query: query})
}
