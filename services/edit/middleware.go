package edit

import (
	"errors"

	"github.com/globalsign/mgo/bson"
	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/redux"
)

func middleware(publish func(e *events.Event) (err error)) redux.Middleware {
	return func(
		store *redux.Store,
		next func(action interface{}),
		action interface{},
	) (err error) {
		stateInterfaceMap := store.GetState()
		stateInterfaceEdit, stateInterfaceEditOK := stateInterfaceMap[storeKeyEdit]
		if !stateInterfaceEditOK {
			err = errors.New("no edit state entry in store")
			return
		}
		var editState EditState
		switch stateInterfaceEdit.(type) {
		case EditState:
			editState = stateInterfaceEdit.(EditState)
		default:
			err = errors.New("unknown state type")
			return
		}
		switch action.(type) {

		case ActionSaveWord:
			eventType := EventTypeWordCreate
			if editState.Word.ID.Hex() != "" {
				eventType = EventTypeWordUpdate
			} else {
				editState.Word.ID = bson.NewObjectId()
			}
			if editState.Valid {
				errPublish := publish(events.NewUserDataEvent(
					eventType,
					"luna",
					editState.Word,
				))
				if errPublish != nil {
					panic("wtf")
				}
			} else {
				err = errors.New("can not save, word is invalid")
			}
		}
		next(action)
		return
	}
}
