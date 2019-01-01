package redux

import (
	"errors"
	"testing"

	"github.com/davecgh/go-spew/spew"
	"github.com/stretchr/testify/assert"
)

func TestStore(t *testing.T) {
	type testState struct {
		Test string
	}
	type actionTest struct {
		Test string
	}
	fooReducer := func(state interface{}, action interface{}) (newState interface{}, err error) {
		var s testState
		switch state.(type) {
		case nil:
			newState = testState{
				Test: "new",
			}
			return
		case testState:
			s = state.(testState)
		default:
			err = errors.New("this sucks")
			return
		}
		switch action.(type) {
		case actionTest:
			s.Test = action.(actionTest).Test
		}
		newState = s
		return
	}
	store, errStore := NewStore(map[string]Reducer{
		"foo": fooReducer,
	})
	assert.NoError(t, errStore)
	spew.Dump(store.GetState())
	assert.NoError(t, store.Dispatch(nil))
	assert.NoError(t, store.Dispatch(actionTest{Test: "sepp"}))
	spew.Dump(store.GetState())
}
