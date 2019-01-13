package services

import (
	"github.com/globalsign/mgo/bson"
)

type SericeErrorCode int

const (
	ServiceErrorCodeInternalError  SericeErrorCode = 1
	ServiceErrorCodeNotImplemented SericeErrorCode = 999
)

type ServiceError struct {
	Message string
	Code    SericeErrorCode
}

func InternalErr(err error) *ServiceError {
	if err != nil {
		return Err(err.Error(), ServiceErrorCodeInternalError)
	}
	return nil
}

func Err(message string, code SericeErrorCode) *ServiceError {
	return &ServiceError{
		Message: message,
		Code:    code,
	}
}
func (se *ServiceError) Error() string {
	if se == nil {
		return "i am nil dumbass"
	}
	return se.Message
}

type Gender string

const (
	GenderMale   Gender = "male"
	GenderFemale Gender = "female"
	GenderNeuter Gender = "neuter"
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
	PluralWord bool
	Genitive   string

	Gender      Gender
	Declination Declination
}
type Adverb struct {
}

type Conjugation string

const (
	ConjugationA        Conjugation = "A"
	ConjugationI        Conjugation = "I"
	ConjugationE        Conjugation = "E"
	ConjugationKons     Conjugation = "Kons"
	ConjugationKonsExtI Conjugation = "KonsExtI"
)

type Verb struct {
	Praeteritum string
	Perfect     string
	PPP         string
	Conjugation Conjugation
}

type Adjective struct {
	Declinations []Declination
	Gender       Gender
}

type Pronoun struct {
}

type WordType string

const (
	WordTypeNoun      WordType = "WordTypeNoun"
	WordTypeVerb      WordType = "WordTypeVerb"
	WordTypeAdverb    WordType = "WordTypeAdverb"
	WordTypePronoun   WordType = "WordTypePronoun"
	WordTypeAdjective WordType = "WordTypeAdjective"
)

type Word struct {
	ID           bson.ObjectId `bson:"_id"`
	Unit         string
	Word         string
	Translations []string
	// Shapes       []string
	Noun      *Noun      `json:",omitempty"`
	Verb      *Verb      `json:",omitempty"`
	Adjective *Adjective `json:",omitempty"`
	Pronoun   *Pronoun   `json:",omitempty"`
	Adverb    *Adverb    `json:",omitempty"`
}

func (w *Word) GetWordType() (wt WordType) {
	switch true {
	case w.Noun != nil:
		wt = WordTypeNoun
	case w.Adjective != nil:
		wt = WordTypeAdjective
	case w.Verb != nil:
		wt = WordTypeVerb
	case w.Pronoun != nil:
		wt = WordTypePronoun
	}
	return
}

type User struct {
	Email string
	Name  string
}

type TestResult struct {
	Success  bool
	Feedback []string
	Score    float64
}
