package practice

import (
	"errors"
	"fmt"
	"math/rand"
	"sort"
	"strings"

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
		case ActionLearn:
			if practiceState.Word == nil {
				err = errors.New("no word no learning")
				return
			}
			learnEvent, errE := events.NewUserDataEvent(EventTypeLearn, "luna", practiceState.Word)
			if errE != nil {
				err = errE
				return
			}
			publish(learnEvent)
		case ActionAnswer:
			actionAnser := action.(ActionAnswer)
			sort.Strings(actionAnser.Translations)
			sort.Strings(practiceState.Word.Translations)
			correct := []string{}
			wrong := []string{}
			const trim = " "
			for _, userTranslation := range actionAnser.Translations {
				userTranslation = strings.Trim(userTranslation, trim)
				translationCorrect := false
				for _, translation := range practiceState.Word.Translations {
					translation = strings.Trim(translation, trim)
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
			e, errE := events.NewUserDataEvent(EventTypeAnswer, "luna", feedback)
			if errE != nil {
				err = errE
				return
			}
			publish(e)
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
