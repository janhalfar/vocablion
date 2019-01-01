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

	}
	if err != nil {
		return
	}
	return state, nil
}
