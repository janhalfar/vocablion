package services

import "github.com/globalsign/mgo/bson"

type EventType string

const (
	EventTypeUpsertWord EventType = "EventUpsertWord"
	EventTypeRemoveWord EventType = "EventRemoveWord"
)

type SericeErrorCode int

const SericeErrorCodeInternalError SericeErrorCode = 1

type ServiceError struct {
	Message string
	Code    SericeErrorCode
}

func (se *ServiceError) Error() string {
	if se == nil {
		return "i am nil dumbass"
	}
	return se.Message
}

type EventUpsertWord struct {
	ID   bson.ObjectId `json:"-",bson:"_id"`
	Type EventType
	Word *Word
}
type EventRemoveWord struct {
	ID     bson.ObjectId `json:"-",bson:"_id"`
	Type   EventType
	WordID string
}

type Sex string

const (
	SexMale   Sex = "male"
	SexFemale Sex = "female"
	SexNeuter Sex = "neuter"
)

type Declination string

const (
	DeclinationA           Declination = "a"
	DeclinationO           Declination = "o"
	DeclinationONeuter     Declination = "oneuter"
	DeclinationE           Declination = "e"
	DeclinationThird       Declination = "third"
	DeclinationThirdNeuter Declination = "thirdNeuter"
	DeclinationU           Declination = "u"
	DeclinationKons        Declination = "kons"
)

type Noun struct {
	Word         string
	PluralWord   bool
	Genitive     string
	Translations []string
	Sex          Sex
	Declination  Declination
}

type Verb struct {
	Translations []string
}

type Adjective struct {
	Translations []string
}

type Pronoun struct {
	Translations []string
}

type Word struct {
	Unit      string
	Noun      *Noun
	Verb      *Verb
	Adjective *Adjective
	Pronoun   *Pronoun
}
