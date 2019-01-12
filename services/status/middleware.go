package status

import (
	"errors"
	"fmt"

	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/redux"
)

func Middleware(
	publish func(e *events.Event) (err error),
) redux.Middleware {
	return func(
		store *redux.Store,
		next func(action interface{}),
		action interface{},
	) (err error) {
		stateInterfaceMap := store.GetState()
		stateInterfaceStatus, stateInterfaceStatusOK := stateInterfaceMap[StoreKey]
		if !stateInterfaceStatusOK {
			err = errors.New("no edit state entry in store")
			return
		}
		var statusState StatusState
		switch stateInterfaceStatus.(type) {
		case StatusState:
			statusState = stateInterfaceStatus.(StatusState)
		default:
			err = errors.New("unknown state type")
			return
		}
		fmt.Println(statusState)
		switch action.(type) {
		}
		next(action)
		return
	}
}
