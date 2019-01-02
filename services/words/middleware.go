package words

import (
	"errors"
	"fmt"

	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/redux"
	"github.com/janhalfar/vocablion/services"
)

const PageSize = 100

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
		stateInterfaceWords, stateInterfaceWordsOK := stateInterfaceMap[StoreKey]
		if !stateInterfaceWordsOK {
			err = errors.New("no edit state entry in store")
			return
		}
		var wordsState WordsState
		switch stateInterfaceWords.(type) {
		case WordsState:
			wordsState = stateInterfaceWords.(WordsState)
		default:
			err = errors.New("unknown state type")
			return
		}
		fmt.Println(wordsState)
		switch action.(type) {
		case ActionSearch:
			actionSearch := action.(ActionSearch)
			q := bson.M{}
			if actionSearch.Query != "" {
				q["word"] = actionSearch.Query
			}
			query := vocabCollection.Find(q)
			count, errCount := query.Count()
			if errCount != nil {
				err = errCount
				return
			}
			words := []*services.Word{}
			errAll := query.Skip(wordsState.Page * PageSize).Limit(PageSize).All(&words)
			if errAll != nil {
				err = errAll
				return
			}
			store.Dispatch(ActionLoadWords{
				Total: count,
				Words: words,
			})
		}
		next(action)
		return
	}
}
