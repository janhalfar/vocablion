package edit

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

const StoreKey = "edit"

func NewService(
	p *persistence.P,
	eventsStore *events.Store,
	sessionStore *services.SessionStore,
) (s *Service, err error) {
	s = &Service{
		sessionStore: sessionStore,
		eventsStore:  eventsStore,
	}
	eventsStore.Subscribe([]events.Type{EventTypeWordCreate, EventTypeWordUpdate, EventTypeWordDelete}, EventsSubscriber(p))
	return
}

func (s *Service) sessionDispatch(
	w http.ResponseWriter,
	r *http.Request,
	action interface{},
) (newState EditState, err *services.ServiceError) {
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
	case EditState:
		newState = newStateInterface.(EditState)
	default:
		err = services.InternalErr(errors.New("new state type error"))
		return
	}
	return
}

func (s *Service) SaveWord(
	w http.ResponseWriter,
	r *http.Request,
) (state EditState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionSaveWord{})
}

func (s *Service) SetType(
	w http.ResponseWriter,
	r *http.Request,
	wordType services.WordType,
) (state EditState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionSetType{WordType: wordType})
}

func (s *Service) SetGender(
	w http.ResponseWriter,
	r *http.Request,
	gender services.Gender,
) (state EditState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionSetGender{Gender: gender})
}

func (s *Service) SetWord(
	w http.ResponseWriter,
	r *http.Request,
	word string,
) (state EditState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionSetWord{Word: word})
}

func (s *Service) SetUnit(
	w http.ResponseWriter,
	r *http.Request,
	unit string,
) (state EditState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionSetUnit{Unit: unit})
}

func (s *Service) SetGenitive(
	w http.ResponseWriter,
	r *http.Request,
	genitive string,
) (state EditState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionSetGenitive{Genitive: genitive})
}

func (s *Service) SetDeclination(
	w http.ResponseWriter,
	r *http.Request,
	declination services.Declination,
) (state EditState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionSetDeclination{Declination: declination})
}

func (s *Service) AddTranslation(
	w http.ResponseWriter,
	r *http.Request,
	translation string,
) (state EditState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionAddTranslation{Translation: translation})
}

func (s *Service) DeleteTranslation(
	w http.ResponseWriter,
	r *http.Request,
	translation string,
) (state EditState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionDeleteTranslation{Translation: translation})
}

func (s *Service) SetVerbConjugation(
	w http.ResponseWriter,
	r *http.Request,
	conjugation services.Conjugation,
) (state EditState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionVerbSetConjugation{Conjugation: conjugation})
}

func (s *Service) SetVerbExcpetions(
	w http.ResponseWriter,
	r *http.Request,
	praeteritum string,
	perfect string,
	ppp string,
) (state EditState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionVerbSetExceptions{
		Praeteritum: praeteritum,
		Perfect:     perfect,
		PPP:         ppp,
	})
}
