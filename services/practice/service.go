package practice

import (
	http "net/http"

	"github.com/pkg/errors"

	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/persistence"
	"github.com/janhalfar/vocablion/services"
)

type Service struct {
	sessionStore *services.SessionStore
	eventsStore  *events.Store
}

const StoreKey = "practice"

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
) (newState PracticeState, err *services.ServiceError) {

	newStateMap, e := s.sessionStore.Dispatch(w, r, action)
	if e != nil {
		err = services.InternalErr(errors.Wrap(e, "dispatch error"))
		return
	}

	newStateInterface, ok := newStateMap[StoreKey]
	if !ok {
		err = &services.ServiceError{Message: "store state is missing: " + StoreKey}
		return
	}
	switch newStateInterface.(type) {
	case PracticeState:
		newState = newStateInterface.(PracticeState)
	default:
		err = services.InternalErr(errors.New("new state type error"))
		return
	}
	return
}

func (s *Service) Next(
	w http.ResponseWriter,
	r *http.Request,
	unit string,
) (state PracticeState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionNext{})
}

func (s *Service) Answer(w http.ResponseWriter,
	r *http.Request,
	wordType services.WordType,
	translations []string,
) (state PracticeState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionAnswer{
		WordType:     wordType,
		Translations: translations,
	})
}
