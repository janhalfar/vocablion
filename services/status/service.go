package status

import (
	http "net/http"
	time "time"

	"github.com/pkg/errors"

	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/persistence"
	"github.com/janhalfar/vocablion/services"
	"github.com/janhalfar/vocablion/services/edit"
	"github.com/janhalfar/vocablion/services/practice"
)

type Service struct {
	sessionStore    *services.SessionStore
	eventsStore     *events.Store
	userEventSeries userEventSeries
}

const StoreKey = "status"

func NewService(
	p *persistence.P,
	eventsStore *events.Store,
	sessionStore *services.SessionStore,
) (s *Service, err error) {
	s = &Service{
		sessionStore:    sessionStore,
		eventsStore:     eventsStore,
		userEventSeries: userEventSeries{},
	}
	eventsStore.Subscribe([]events.Type{}, eventsSubscriber(p))
	return
}

func (s *Service) sessionDispatch(
	w http.ResponseWriter,
	r *http.Request,
	action interface{},
) (newState StatusState, err *services.ServiceError) {
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
	case StatusState:
		newState = newStateInterface.(StatusState)
	default:
		err = services.InternalErr(errors.New("new state type error"))
		return
	}
	return
}

func (s *Service) Status(
	w http.ResponseWriter,
	r *http.Request,
) (state StatusState, err *services.ServiceError) {
	return s.sessionDispatch(w, r, ActionStatus{})
}

func (s *Service) GetStatus(
	w http.ResponseWriter,
	r *http.Request,
) (state StatusState, err *services.ServiceError) {
	es := []Event{}
	stats := Stats{}
	subscriptions := events.Subscriptions{
		events.NewSubscription(
			[]events.Type{practice.EventTypeAnswer, edit.EventTypeWordCreate, edit.EventTypeWordUpdate},
			func(event *events.Event) (err error) {
				e := Event{}
				e.Timestamp = event.Time.Unix()
				switch event.Type {
				case edit.EventTypeWordCreate, edit.EventTypeWordUpdate:
					w := &services.Word{}
					errAs := event.Data.As(&w)
					if errAs != nil {
						err = errAs
						return
					}
					switch event.Type {
					case edit.EventTypeWordCreate:
						stats.WordCreate++
						e.CreateWord = w
					case edit.EventTypeWordUpdate:
						stats.WordUpdate++
						e.UpdateWord = w
					}
				case practice.EventTypeAnswer:
					feedback := &practice.Feedback{}
					errAs := event.Data.As(&feedback)
					if errAs != nil {
						err = errAs
						return
					}
					e.Feedback = feedback
					if feedback.Success {
						stats.PracticeRight++
					} else {
						stats.PracticeWrong++

					}
				}
				es = append([]Event{e}, es...)
				return
			},
		),
	}
	s.eventsStore.Replay(time.Date(
		int(1970),
		time.January,
		int(0), int(0), int(0), int(0), int(0),
		time.UTC,
	), subscriptions)
	return s.sessionDispatch(w, r, ActionStatus{es: es, stats: stats})
}
