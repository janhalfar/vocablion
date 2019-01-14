package practice

import (
	http "net/http"
	"time"

	"github.com/pkg/errors"

	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/persistence"
	"github.com/janhalfar/vocablion/services"
)

type Service struct {
	sessionStore *services.SessionStore
	eventsStore  *events.Store
	stats        *stats
}

const StoreKey = "practice"

func NewService(
	p *persistence.P,
	eventsStore *events.Store,
	sessionStore *services.SessionStore,
) (s *Service, err error) {
	stats, errSt := newStats(p.GetCollVocab())
	if errSt != nil {
		err = errSt
		return
	}
	s = &Service{
		sessionStore: sessionStore,
		eventsStore:  eventsStore,
		stats:        stats,
	}
	eventsStore.Subscribe([]events.Type{EventTypeAnswer}, eventsSubscriber(p))
	since, errSince := time.Parse("2006-01-02", "2018-12-23")
	if errSince != nil {
		err = errSince
		return
	}
	eventsStore.ReplayAndSubscribe(since, []events.Subscription{
		events.NewSubscription([]events.Type{
			EventTypeAnswer,
			EventTypeLearn,
		}, s.stats.eventsSubscriber),
	})
	return
}

func castState(stateMap map[string]interface{}) (state PracticeState, err *services.ServiceError) {
	newStateInterface, ok := stateMap[StoreKey]
	if !ok {
		err = &services.ServiceError{Message: "store state is missing: " + StoreKey}
		return
	}
	switch newStateInterface.(type) {
	case PracticeState:
		state = newStateInterface.(PracticeState)
	default:
		err = services.InternalErr(errors.New("new state type error"))
		return
	}
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
	newState, errCast := castState(newStateMap)
	if errCast != nil {
		err = errCast
		return
	}
	if newState.Word != nil {
		// stats
		newStateMap, e = s.sessionStore.Dispatch(w, r, actionUpdateStats{
			stats: s.stats.getStats(newState.Word.ID.Hex()),
		})
		if e != nil {
			err = services.InternalErr(errors.Wrap(e, "dispatch error"))
			return
		}
		return castState(newStateMap)
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
	translations []string,
) (state PracticeState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionAnswer{
		Translations: translations,
	})
}

func (s *Service) Learn(w http.ResponseWriter,
	r *http.Request,
) (state PracticeState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionLearn{})
}
