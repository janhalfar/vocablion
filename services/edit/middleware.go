package edit

import (
	"errors"

	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/redux"
	"github.com/janhalfar/vocablion/services"
)

func Middleware(
	publish func(e *events.Event) (err error),
	vocabColl *mgo.Collection,
) redux.Middleware {
	return func(
		store *redux.Store,
		next func(action interface{}),
		action interface{},
	) (err error) {
		stateInterfaceMap := store.GetState()
		stateInterfaceEdit, stateInterfaceEditOK := stateInterfaceMap[StoreKey]
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
		case ActionLoadWord:
			actionLoadWord := action.(ActionLoadWord)
			w := &services.Word{}
			if !bson.IsObjectIdHex(actionLoadWord.ID) {
				err = errors.New("word id is not a bson id " + actionLoadWord.ID)
				return
			}
			errFind := vocabColl.Find(bson.M{"_id": bson.ObjectIdHex(actionLoadWord.ID)}).One(&w)
			if errFind != nil {
				err = errFind
				return
			}
			store.Dispatch(actionLoadTheDarnWord{word: w})
		case ActionSaveWord:
			eventType := EventTypeWordCreate
			if editState.Word.ID.Hex() != "" {
				eventType = EventTypeWordUpdate
			} else {
				editState.Word.ID = bson.NewObjectId()
			}
			if editState.Valid {
				e, errE := events.NewUserDataEvent(
					eventType,
					"luna",
					editState.Word,
				)
				if errE != nil {
					err = errE
					return
				}
				errPublish := publish(e)
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
