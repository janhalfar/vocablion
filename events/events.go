package events

import (
	"time"

	"github.com/globalsign/mgo/bson"
)

type Type string

type Event struct {
	ID     bson.ObjectId
	Time   time.Time
	Type   Type
	UserID string
	Data   interface{}
}

func NewEvent(t Type) (e *Event) {
	return &Event{
		ID:   bson.NewObjectId(),
		Time: time.Now(),
		Type: t,
	}
}

func NewUserEvent(t Type, userID string) (e *Event) {
	e = NewEvent(t)
	e.UserID = userID
	return
}

func NewUserDataEvent(t Type, userID string, data interface{}) (e *Event) {
	e = NewUserEvent(t, userID)
	e.Data = data
	return
}
