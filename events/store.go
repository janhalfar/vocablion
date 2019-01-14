package events

import (
	"time"

	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
	"github.com/pkg/errors"
)

type Subscription struct {
	types      []Type
	subscriber Subscriber
}

func NewSubscription(
	types []Type,
	subscriber Subscriber,
) Subscription {
	return Subscription{
		types:      types,
		subscriber: subscriber,
	}
}

type Subscriptions []Subscription

func (s Subscriptions) fire(event *Event) (err error) {
	// fmt.Println("firing", event.Type, event.Time, event.UserID, event.ID)
SubLoop:
	for _, sub := range s {
		for _, eventType := range sub.types {
			// fmt.Println("event.Type == eventType", event.Type == eventType)
			if event.Type == eventType {
				err = sub.subscriber(event)
				// fmt.Println("called subscriber", err)
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

func (s *Store) ReplayAndSubscribe(since time.Time, subscriptions []Subscription) (err error) {
	errReplay := s.Replay(since, subscriptions)
	if errReplay != nil {
		err = errReplay
		return
	}
	for _, sub := range subscriptions {
		errSub := s.Subscribe(sub.types, sub.subscriber)
		if errSub != nil {
			err = errSub
			return
		}
	}
	return
}

func (s *Store) Replay(since time.Time, subscriptions []Subscription) (err error) {
	types := []Type{}
	eventMap := map[Type][]Subscriber{}
	for _, s := range subscriptions {
		types = append(types, s.types...)
		for _, eventType := range types {
			_, ok := eventMap[eventType]
			if !ok {
				eventMap[eventType] = []Subscriber{}
			}
			eventMap[eventType] = append(eventMap[eventType], s.subscriber)
		}
	}
	q := s.coll.Find(bson.M{"type": bson.M{"$in": types}})
	iter := q.Iter()
	e := &Event{}
	for iter.Next(&e) {
		errIter := iter.Err()
		if errIter != nil {
			err = errIter
			return
		}
		subscribers, ok := eventMap[e.Type]
		if ok {
			for _, subscriber := range subscribers {
				errSubscriber := subscriber(e)
				if errSubscriber != nil {
					err = errSubscriber
					return
				}
			}
		}
	}
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
