package practice

import (
	"errors"
)

func Reducer(
	s interface{},
	action interface{},
) (newState interface{}, err error) {
	var state PracticeState
	switch s.(type) {
	case nil:
		newState = PracticeState{}
		return
	case PracticeState:
		state = s.(PracticeState)
	default:
		err = errors.New("invalid state")
	}
	switch action.(type) {
	case ActionLoadWord:
		newState, err = reduceActionLoadWord(state, action.(ActionLoadWord))
		return
	default:
		newState = state
	}
	if err != nil {
		return
	}
	return state, nil
}

func reduceActionLoadWord(state PracticeState, action ActionLoadWord) (newState PracticeState, err error) {
	newState = PracticeState{
		Word:     action.Word,
		Question: action.Word.Word,
		Feedback: Feedback{
			Complete: false,
			ProgessTranslations: Progress{
				Complete: false,
				Total:    len(action.Word.Translations),
				Correct:  []string{},
				Wrong:    []string{},
			},
		},
	}
	return

}
