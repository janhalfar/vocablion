package events

import (
	"testing"

	"github.com/globalsign/mgo/bson"
	"github.com/stretchr/testify/assert"
)

type userData struct {
	Name string
	Age  int
}

const eventTypeNewUser Type = "newUser"

func TestEventBSON(t *testing.T) {
	originalData := &userData{Name: "jan", Age: 12}
	e, errU := NewUserDataEvent(eventTypeNewUser, "jan", originalData)
	assert.NoError(t, errU)
	loadedData := &userData{}
	errAs := e.Data.As(&loadedData)
	assert.NoError(t, errAs)
	assert.Equal(t, originalData, loadedData)
	if loadedData == originalData {
		t.Fatal("ho can original and loaded data be the same instance")
	}
	outBytes, errMarhal := bson.Marshal(e)
	assert.NoError(t, errMarhal)
	loadedEvent := &Event{}
	errLoad := bson.Unmarshal(outBytes, &loadedEvent)
	assert.NoError(t, errLoad)
	ud := &userData{}
	errAsSerialized := loadedEvent.Data.As(&ud)
	assert.NoError(t, errAsSerialized)
}
