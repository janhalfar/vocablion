package practice

import (
	"fmt"

	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/persistence"
)

func eventsSubscriber(p *persistence.P) events.Subscriber {
	return func(event *events.Event) (err error) {
		switch event.Type {
		case EventTypeAnswer:
			fmt.Println("there comes an aswer", event.Data)
		default:
			fmt.Println("häääää from edit events", event.Type)
		}
		return
	}
}
