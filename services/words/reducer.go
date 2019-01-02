package words

import (
	"errors"
)

func Reducer(
	s interface{},
	action interface{},
) (newState interface{}, err error) {
	var state WordsState
	switch s.(type) {
	case nil:
		newState = WordsState{}
		return
	case WordsState:
		state = s.(WordsState)
	default:
		err = errors.New("invalid state")
	}
	switch action.(type) {
	case ActionLoadWords:
		newState, err = reduceActionLoadWords(state, action.(ActionLoadWords))
	case ActionSearch:
		newState, err = reduceActionSearch(state, action.(ActionSearch))
	default:
		newState = state
	}
	if err != nil {
		return
	}
	return
}

func reduceActionLoadWords(state WordsState, action ActionLoadWords) (newState WordsState, err error) {
	newState = state
	newState.Words = action.Words
	newState.Total = action.Total
	return

}
func reduceActionSearch(state WordsState, action ActionSearch) (newState WordsState, err error) {
	newState = state
	newState.Query = action.Query
	return

}
