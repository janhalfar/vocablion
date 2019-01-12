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
			feedback := &Feedback{}
			errAs := event.Data.As(&feedback)
			fmt.Println("practice subscriber: there comes feedback", feedback, errAs)
		default:
			fmt.Println("practice subscriber: häääää", event.Type)
		}
		return
	}
}
