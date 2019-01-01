package edit

import (
	"testing"

	"github.com/davecgh/go-spew/spew"
	"github.com/janhalfar/vocablion/redux"
	"github.com/janhalfar/vocablion/services"
	"github.com/stretchr/testify/assert"
)

func TestStore(t *testing.T) {
	store, errStore := redux.NewStore(map[string]redux.Reducer{
		storeKeyEdit: Reducer,
	})
	assert.NoError(t, errStore)
	assert.NoError(t, store.Dispatch(ActionSetType{WordType: services.WordTypeNoun}))
	assert.NoError(t, store.Dispatch(ActionSetWord{Word: "laudare"}))
	assert.NoError(t, store.Dispatch(ActionAddTranslation{"loben"}))
	assert.NoError(t, store.Dispatch(ActionAddTranslation{"verziehen"}))
	assert.NoError(t, store.Dispatch(ActionAddTranslation{"schleimen"}))
	assert.NoError(t, store.Dispatch(ActionDeleteTranslation{"schleimen"}))
	spew.Dump(store.GetState())
}
