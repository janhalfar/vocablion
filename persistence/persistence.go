package persistence

import (
	"github.com/globalsign/mgo"
)

type P struct {
	sess *mgo.Session
	db   *mgo.Database
}

func NewP(mongoURL string) (p *P, err error) {
	session, errDial := mgo.Dial(mongoURL)
	if errDial != nil {
		err = errDial
		return
	}
	p = &P{
		sess: session,
		db:   session.DB("vocablion"),
	}
	return
}

type collName string

const (
	collNameVocab  collName = "vocab"
	collNameEvents collName = "events"
)

func (p *P) getColl(name collName) (coll *mgo.Collection) {
	return p.db.C(string(name))
}

func (p *P) GetCollVocab() *mgo.Collection {
	return p.getColl(collNameVocab)
}
func (p *P) GetCollEvents() *mgo.Collection {
	return p.getColl(collNameEvents)
}
