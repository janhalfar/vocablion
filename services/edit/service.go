package edit

import (
	"errors"
	"fmt"
	http "net/http"

	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/persistence"
	"github.com/janhalfar/vocablion/redux"
	"github.com/janhalfar/vocablion/services"
	yaml "gopkg.in/yaml.v1"
)

type Service struct {
	sessionStore *services.SessionStore
	store        *redux.Store
	eventsStore  *events.Store
}

const storeKeyEdit = "edit"

func NewService(p *persistence.P, eventsStore *events.Store) (s *Service, err error) {

	sessionStore, errSessionStore := services.NewSessionStore()
	if errSessionStore != nil {
		err = errSessionStore
		return
	}

	store, errStore := redux.NewStore(map[string]redux.Reducer{
		storeKeyEdit: Reducer,
	}, middleware(eventsStore.Publish))

	if errStore != nil {
		err = errStore
		return
	}
	s = &Service{
		sessionStore: sessionStore,
		eventsStore:  eventsStore,
		store:        store,
	}
	eventsStore.Subscribe([]events.Type{EventTypeWordCreate, EventTypeWordUpdate, EventTypeWordDelete}, EventsSubscriber(p))
	return
}

func setState(
	sessionStore *services.SessionStore,
	w http.ResponseWriter,
	r *http.Request,
	newState EditState,
) (state EditState, err *services.ServiceError) {
	errSession := sessionStore.SetState(w, r, state)
	if errSession != nil {
		err = services.InternalErr(errSession)
		return
	}
	state = newState
	stateBytes, errStateBytes := yaml.Marshal(state)
	if errStateBytes == nil {
		fmt.Println(string(stateBytes))
	}
	return
}

func getState(sessionStore *services.SessionStore, w http.ResponseWriter, r *http.Request) (state EditState, err *services.ServiceError) {
	stateInterface, errSession := sessionStore.GetState(r)
	if errSession != nil {
		stateInterface, _ = Reducer(nil, nil)
		newState, errSetState := setState(sessionStore, w, r, stateInterface.(EditState))
		if errSetState != nil {
			err = services.InternalErr(errSession)
			return

		}
		state = newState
		return
	}
	state, ok := stateInterface.(EditState)
	if !ok {
		state = EditState{}
	}
	return
}

func (s *Service) sessionDo(
	w http.ResponseWriter,
	r *http.Request,
	do func(state EditState) (EditState, *services.ServiceError),
) (state EditState, err *services.ServiceError) {
	state, errState := getState(s.sessionStore, w, r)
	if errState != nil {
		err = errState
		return
	}
	newState, errDo := do(state)
	if errDo != nil {
		err = errDo
		return
	}
	state = newState
	return setState(s.sessionStore, w, r, state)
}

func (s *Service) sessionReduce(
	w http.ResponseWriter,
	r *http.Request,
	action interface{},
) (newState EditState, err *services.ServiceError) {
	return s.sessionDo(
		w,
		r,
		func(state EditState) (newState EditState, err *services.ServiceError) {
			e := s.store.Dispatch(action)
			switch e.(type) {
			case *services.ServiceError:
				err = e.(*services.ServiceError)
			default:
				err = services.InternalErr(e)
			}
			newStateInterface, newStateOK := s.store.GetState()[storeKeyEdit]
			if !newStateOK {
				err = services.InternalErr(errors.New("where is me state"))
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
		})
}

// func (s *Service) WordInit(
// 	w http.ResponseWriter,
// 	r *http.Request,
// ) (state EditState, err *services.ServiceError) {
// 	return s.sessionDo(w, r, func(state EditState) (newState EditState, err *services.ServiceError) {
// 		newState = state
// 		return
// 	})
// }

func (s *Service) SaveWord(
	w http.ResponseWriter,
	r *http.Request,
) (state EditState, err *services.ServiceError) {
	return s.sessionReduce(w, r, ActionSaveWord{})
}

func (s *Service) SetType(
	w http.ResponseWriter,
	r *http.Request,
	wordType services.WordType,
) (state EditState, err *services.ServiceError) {
	return s.sessionReduce(w, r, ActionSetType{WordType: wordType})
}

func (s *Service) SetGender(
	w http.ResponseWriter,
	r *http.Request,
	gender services.Gender,
) (state EditState, err *services.ServiceError) {
	return s.sessionReduce(w, r, ActionSetGender{Gender: gender})
}

func (s *Service) SetWord(
	w http.ResponseWriter,
	r *http.Request,
	word string,
) (state EditState, err *services.ServiceError) {
	return s.sessionReduce(w, r, ActionSetWord{Word: word})
}

func (s *Service) SetUnit(
	w http.ResponseWriter,
	r *http.Request,
	unit string,
) (state EditState, err *services.ServiceError) {
	return s.sessionReduce(w, r, ActionSetUnit{Unit: unit})
}

func (s *Service) SetGenitive(
	w http.ResponseWriter,
	r *http.Request,
	genitive string,
) (state EditState, err *services.ServiceError) {
	return s.sessionReduce(w, r, ActionSetGenitive{Genitive: genitive})
}

func (s *Service) SetDeclination(
	w http.ResponseWriter,
	r *http.Request,
	declination services.Declination,
) (state EditState, err *services.ServiceError) {
	return s.sessionReduce(w, r, ActionSetDeclination{Declination: declination})
}

func (s *Service) AddTranslation(
	w http.ResponseWriter,
	r *http.Request,
	translation string,
) (state EditState, err *services.ServiceError) {
	return s.sessionReduce(w, r, ActionAddTranslation{Translation: translation})
}

func (s *Service) DeleteTranslation(
	w http.ResponseWriter,
	r *http.Request,
	translation string,
) (state EditState, err *services.ServiceError) {
	return s.sessionReduce(w, r, ActionDeleteTranslation{Translation: translation})
}

func (s *Service) SetVerbConjugation(
	w http.ResponseWriter,
	r *http.Request,
	conjugation services.Conjugation,
) (state EditState, err *services.ServiceError) {
	return s.sessionReduce(w, r, ActionVerbSetConjugation{Conjugation: conjugation})
}

func (s *Service) SetVerbExcpetions(
	w http.ResponseWriter,
	r *http.Request,
	praeteritum string,
	perfect string,
	ppp string,
) (state EditState, err *services.ServiceError) {
	return s.sessionReduce(w, r, ActionVerbSetExceptions{
		Praeteritum: praeteritum,
		Perfect:     perfect,
		PPP:         ppp,
	})
}
