package words

import (
	"fmt"

	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/persistence"
)

func eventsSubscriber(p *persistence.P) events.Subscriber {
	return func(event *events.Event) (err error) {
		switch event.Type {
		default:
			fmt.Println("häääää from words events", event.Type)
		}
		return
	}
}
