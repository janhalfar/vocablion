package status

import (
	"errors"
)

func Reducer(
	s interface{},
	action interface{},
) (newState interface{}, err error) {
	var state StatusState
	switch s.(type) {
	case nil:
		newState = StatusState{}
		return
	case StatusState:
		state = s.(StatusState)
	default:
		err = errors.New("invalid state")
	}
	switch action.(type) {
	default:
		newState = state
	}
	if err != nil {
		return
	}
	return
}
