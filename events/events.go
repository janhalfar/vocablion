package events

import (
	"errors"
	"time"

	"github.com/globalsign/mgo/bson"
)

type Type string

type Data struct {
	raw  bson.Raw
	data interface{}
}

type Event struct {
	ID     bson.ObjectId
	Time   time.Time
	Type   Type
	UserID string
	Data   *Data
}

func (data *Data) SetBSON(raw bson.Raw) (err error) {
	data.raw = raw
	return
}

func (data *Data) GetBSON() (interface{}, error) {
	if data.data == nil {
		return nil, errors.New("no data no bson")
	}
	return data.data, nil
}

func (data *Data) As(as interface{}) (err error) {
	return data.raw.Unmarshal(as)
}

func (d *Data) Set(data interface{}) (err error) {
	d.data = data
	raw, errRaw := bson.Marshal(d.data)
	if errRaw != nil {
		err = errRaw
		return
	}
	d.raw = bson.Raw{
		// TODO this is a hack
		Kind: 3, // reflect.ValueOf(data).Kind(),
		Data: raw,
	}
	return
}

func NewEvent(t Type) (e *Event) {
	return &Event{
		ID:   bson.NewObjectId(),
		Time: time.Now(),
		Type: t,
		Data: &Data{},
	}
}

func NewUserEvent(t Type, userID string) (e *Event) {
	e = NewEvent(t)
	e.UserID = userID
	return
}

func NewUserDataEvent(t Type, userID string, data interface{}) (e *Event, err error) {
	e = NewUserEvent(t, userID)
	err = e.Data.Set(data)
	return
}
