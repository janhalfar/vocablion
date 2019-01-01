package practice

import (
	"errors"
	"fmt"

	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/redux"
	"github.com/janhalfar/vocablion/services"
)

func Middleware(
	publish func(e *events.Event) (err error),
	vocabCollection *mgo.Collection,
) redux.Middleware {
	return func(
		store *redux.Store,
		next func(action interface{}),
		action interface{},
	) (err error) {
		stateInterfaceMap := store.GetState()
		stateInterfacePractice, stateInterfaceEditOK := stateInterfaceMap[StoreKey]
		if !stateInterfaceEditOK {
			err = errors.New("no edit state entry in store")
			return
		}
		var practiceState PracticeState
		switch stateInterfacePractice.(type) {
		case PracticeState:
			practiceState = stateInterfacePractice.(PracticeState)
		default:
			err = errors.New("unknown state type")
			return
		}
		switch action.(type) {
		case ActionNext:
			q := vocabCollection.Find(bson.M{})
			word := &services.Word{}
			q.One(&word)
			store.Dispatch(ActionLoadWord{Word: word})
		}
		fmt.Println(practiceState)
		next(action)
		return
	}
}
