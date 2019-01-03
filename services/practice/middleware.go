package practice

import (
	"errors"
	"fmt"
	"math/rand"

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
			words := []*services.Word{}
			c, errCount := q.Count()
			fmt.Println(c, errCount)
			errOne := q.All(&words)
			if errOne != nil {
				return errOne
			}
			if len(words) == 0 {
				return errors.New("i have no words")
			}
			store.Dispatch(ActionLoadWord{Word: words[rand.Intn(len(words)-1)]})
		}
		fmt.Println(practiceState)
		next(action)
		return
	}
}
