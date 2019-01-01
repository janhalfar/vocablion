package practice

import (
	"errors"
	"fmt"

	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/redux"
)

func Middleware(publish func(e *events.Event) (err error)) redux.Middleware {
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

		}
		fmt.Println(practiceState)
		next(action)
		return
	}
}
