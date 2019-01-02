package edit

import (
	"errors"
	"fmt"

	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/persistence"
	"github.com/janhalfar/vocablion/services"
)

func EventsSubscriber(p *persistence.P) events.Subscriber {
	return func(event *events.Event) (err error) {
		// fmt.Println("edit.EventsSubscriber", event.Type)
		switch event.Type {
		case EventTypeWordCreate, EventTypeWordUpdate:
			w, wOK := event.Data.(*services.Word)
			if !wOK {
				err = errors.New("could not cast event.Data as *services.Word")
				return
			}
			_, errUpsert := p.GetCollVocab().UpsertId(w.ID, w)
			if errUpsert != nil {
				err = errUpsert
				return
			}
		case EventTypeWordDelete:
			fmt.Println("deletion is not implemented yet")
		default:
			fmt.Println("häääää", event.Type)
		}
		return
	}
}
