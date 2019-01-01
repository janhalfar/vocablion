package events

import (
	"fmt"
	"time"

	"github.com/globalsign/mgo"
	"github.com/pkg/errors"
)

type Subscription struct {
	types      []Type
	subscriber Subscriber
}

type Subscriptions []Subscription

func (s Subscriptions) fire(event *Event) (err error) {
	fmt.Println("firing", event.Type, event.Time, event.UserID, event.ID)
SubLoop:
	for _, sub := range s {
		for _, eventType := range sub.types {
			fmt.Println("event.Type == eventType", event.Type == eventType)
			if event.Type == eventType {
				err = sub.subscriber(event)
				fmt.Println("called subscriber", err)
				if err != nil {
					return
				}
				continue SubLoop
			}
		}
	}
	return
}

type Store struct {
	subscriptions Subscriptions
	chanSubscribe chan Subscription
	coll          *mgo.Collection
}

type Subscriber func(event *Event) (err error)

func NewStore(coll *mgo.Collection) (s *Store, err error) {
	s = &Store{
		chanSubscribe: make(chan Subscription),
		coll:          coll,
		subscriptions: Subscriptions{},
	}
	go s.routineSubscribe()
	return
}

func (s *Store) routineSubscribe() {
	for {
		select {
		case subscription := <-s.chanSubscribe:
			s.subscriptions = append(s.subscriptions, subscription)
		}
	}
}

func (s *Store) Subscribe(types []Type, subscriber Subscriber) (err error) {
	s.chanSubscribe <- Subscription{types: types, subscriber: subscriber}
	return
}

func (s *Store) Replay(since time.Time, subscriptions []Subscription) (err error) {
	return
}

func (s *Store) Publish(event *Event) (err error) {
	// store it,
	errInsert := s.coll.Insert(event)
	if errInsert != nil {
		err = errors.Wrap(errInsert, "could not store event")
		return
	}
	// fire it
	errFire := s.subscriptions.fire(event)
	if errFire != nil {
		err = errors.Wrap(errFire, "could not fire event")
	}
	return
}
