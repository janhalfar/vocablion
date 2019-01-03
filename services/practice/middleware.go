package practice

import (
	"errors"
	"fmt"
	"math/rand"
	"sort"

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
		case ActionAnswer:
			sort.Strings(practiceState.Word.Translations)
			correct := []string{}
			wrong := []string{}
			for _, userTranslation := range practiceState.Translations {
				translationCorrect := false
				for _, translation := range practiceState.Word.Translations {
					if translation == userTranslation {
						translationCorrect = true
						break
					}
				}
				if translationCorrect {
					correct = append(correct, userTranslation)
				} else {
					wrong = append(wrong, userTranslation)
				}
			}
			feedback := &Feedback{
				WordID:  practiceState.Word.ID.Hex(),
				Success: len(wrong) == 0 && len(correct) == len(practiceState.Word.Translations),
				Correct: correct,
				Wrong:   wrong,
			}
			publish(events.NewUserDataEvent(EventTypeAnswer, "luna", feedback))
			feedback.Solution = practiceState.Word
			errDispatch := store.Dispatch(actionFeedback{feedback: feedback})
			if errDispatch != nil {
				err = errDispatch
				return
			}
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
		next(action)
		return
	}
}
