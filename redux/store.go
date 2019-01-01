package redux

import "errors"

type Reducer func(
	state interface{},
	action interface{},
) (
	newState interface{},
	err error,
)
type Middleware func(
	store *Store,
	next func(action interface{}),
	action interface{},
) (err error)

type Store struct {
	reducers    map[string]Reducer
	middlewares []Middleware
	state       map[string]interface{}
}

func NewStore(
	reducers map[string]Reducer,
	middlewares ...Middleware,
) (s *Store, err error) {
	s = &Store{
		middlewares: middlewares,
		reducers:    reducers,
		state:       map[string]interface{}{},
	}

	for key, r := range s.reducers {
		newState, errReduce := r(nil, nil)
		if errReduce != nil {
			err = errReduce
			return
		}
		s.state[key] = newState
	}
	return
}

func (s *Store) Dispatch(action interface{}) (err error) {
	i := 0
	l := len(s.middlewares)
	for i < l {
		m := s.middlewares[i]
		cont := false
		errMiddleware := m(s, func(modifiedAction interface{}) {
			cont = true
			action = modifiedAction
		}, action)
		if errMiddleware != nil {
			err = errMiddleware
			return
		}
		if !cont {
			break
		}
		i++
	}
	newState := map[string]interface{}{}
	for key, value := range s.state {
		reducer, reducerOK := s.reducers[key]
		if !reducerOK {
			err = errors.New("no reducer for: " + key)
			return
		}
		newStatePart, errNewState := reducer(value, action)
		if errNewState != nil {
			err = errors.New("reducer error: " + errNewState.Error())
			return
		}
		newState[key] = newStatePart
	}
	s.state = newState
	return
}

func (s *Store) GetState() (state map[string]interface{}) {
	state = map[string]interface{}{}
	for key, value := range s.state {
		state[key] = value
	}
	return
}
