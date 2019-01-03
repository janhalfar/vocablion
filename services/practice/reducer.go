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
	case actionFeedback:
		newState, err = reduceActionFeedback(state, action.(actionFeedback))
		return
	default:
		newState = state
	}
	if err != nil {
		return
	}
	return state, nil
}

func reduceActionFeedback(state PracticeState, action actionFeedback) (newState PracticeState, err error) {
	newState = state
	newState.Feedback = action.feedback
	return
}
func reduceActionLoadWord(state PracticeState, action ActionLoadWord) (newState PracticeState, err error) {
	newState = PracticeState{
		Word:     action.Word,
		Question: action.Word.Word,
		Feedback: nil,
	}
	return

}
