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
	case ActionSearch:
		newState, err = reduceActionSearch(state, action.(ActionSearch))
		return
	default:
		newState = state
	}
	if err != nil {
		return
	}
	return state, nil
}

func reduceActionSearch(state WordsState, action ActionSearch) (newState WordsState, err error) {
	newState = WordsState{
		Query: action.Query,
	}
	return

}
