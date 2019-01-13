package edit

import (
	"github.com/globalsign/mgo/bson"
	"github.com/janhalfar/vocablion/services"
)

type ActionSetType struct {
	WordType services.WordType
}
type ActionSetUnit struct {
	Unit string
}

type ActionLoadWord struct {
	ID string
}

type actionLoadTheDarnWord struct {
	word *services.Word
}

type ActionNewWord struct {
	Unit string
}

type ActionSetWordID struct {
	ID bson.ObjectId
}

type ActionSetTranslations struct {
	Translations []string
}

type ActionDeleteTranslation struct {
	Translation string
}

type ActionAddTranslation struct {
	Translation string
}

type ActionSetDeclination struct {
	Declination services.Declination
}

type ActionSetGenitive struct {
	Genitive string
}

type ActionSetPluralWord struct {
	PluralWord bool
}

type ActionSetGender struct {
	Gender services.Gender
}

type ActionSaveWord struct{}
type ActionDeleteWord struct {
	ID string
}

type ActionSetWord struct {
	Word string
}

type ActionVerbSetExceptions struct {
	Praeteritum string
	Perfect     string
	PPP         string
}

type ActionVerbSetConjugation struct {
	Conjugation services.Conjugation
}
