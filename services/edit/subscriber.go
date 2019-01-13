package edit

import (
	"fmt"

	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/persistence"
	"github.com/janhalfar/vocablion/services"
)

func EventsSubscriber(p *persistence.P) events.Subscriber {
	return func(event *events.Event) (err error) {
		switch event.Type {
		case EventTypeWordCreate, EventTypeWordUpdate:
			w := &services.Word{}
			errAs := event.Data.As(&w)
			if errAs != nil {
				err = errAs
				return
			}
			_, errUpsert := p.GetCollVocab().UpsertId(w.ID, w)
			if errUpsert != nil {
				err = errUpsert
				return
			}
		case EventTypeWordDelete:
			w := &services.Word{}
			errAs := event.Data.As(&w)
			if errAs != nil {
				err = errAs
				return
			}
			errDelete := p.GetCollVocab().RemoveId(w.ID)
			if errDelete != nil {
				err = errDelete
				return
			}
		default:
			fmt.Println("häääää", event.Type)
		}
		return
	}
}
