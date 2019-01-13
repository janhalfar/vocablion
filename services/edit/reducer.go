package edit

import (
	"errors"

	"github.com/janhalfar/vocablion/services"
)

func Reducer(
	s interface{},
	action interface{},
) (newState interface{}, err error) {
	var state EditState
	switch s.(type) {
	case nil:
		newState = EditState{}
		return
	case EditState:
		state = s.(EditState)
	default:
		err = errors.New("invalid state")
	}
	switch action.(type) {
	case ActionDeleteWord:
		state = EditState{}
	case ActionSetWordID:
		state, err = reduceActionSetWordID(state, action.(ActionSetWordID))
	case ActionNewWord:
		state, err = reduceActionNewWord(state, action.(ActionNewWord))
	case ActionSetUnit:
		state, err = reduceActionSetUnit(state, action.(ActionSetUnit))
	case ActionSetGender:
		state, err = reduceActionSetGender(state, action.(ActionSetGender))
	case ActionSetDeclination:
		state, err = reduceActionSetDeclination(state, action.(ActionSetDeclination))
	case ActionDeleteTranslation:
		state, err = reduceActionDeleteTranslation(state, action.(ActionDeleteTranslation))
	case ActionAddTranslation:
		state, err = reduceActionAddTranslation(state, action.(ActionAddTranslation))
	case ActionSetType:
		state, err = reduceActionSetType(state, action.(ActionSetType))
	case ActionSetWord:
		state, err = reduceActionSetWord(state, action.(ActionSetWord))
	case ActionSetGenitive:
		state, err = reduceActionSetGenitive(state, action.(ActionSetGenitive))
	case ActionVerbSetExceptions:
		state, err = reduceActionVerbSetExceptions(state, action.(ActionVerbSetExceptions))
	case ActionVerbSetConjugation:
		state, err = reduceActionVerbSetConjugation(state, action.(ActionVerbSetConjugation))
	case actionLoadTheDarnWord:
		state, err = reduceactionLoadTheDarnWord(state, action.(actionLoadTheDarnWord))
	}
	if err != nil {
		return
	}
	state.Valid = validateEditState(state)
	return state, nil
}

func reduceactionLoadTheDarnWord(state EditState, action actionLoadTheDarnWord) (newState EditState, err error) {
	newState = EditState{
		Word:     action.word,
		WordType: action.word.GetWordType(),
	}
	return
}
func validateEditState(state EditState) (valid bool) {
	valid = false
	if state.Word == nil {
		return
	}
	if state.Word.Word == "" {
		return
	}
	emptyTranslation := true
	for _, t := range state.Word.Translations {
		if t != "" {
			emptyTranslation = false
			break
		}
	}
	if emptyTranslation {
		return
	}
	switch true {
	case state.Word.Adverb != nil:
		// validated with basics above
		return true
	case state.Word.Adjective != nil:
		a := state.Word.Adjective
		return len(a.Declinations) > 0 && a.Gender != ""
	case state.Word.Noun != nil:
		return state.Word.Noun.Declination != "" && state.Word.Noun.Gender != "" && state.Word.Noun.Genitive != ""
	case state.Word.Verb != nil:
		v := state.Word.Verb
		exceptionsOK := (v.PPP == "" && v.Perfect == "" && v.Praeteritum == "") || (v.PPP != "" && v.Perfect != "" && v.Praeteritum != "")
		return exceptionsOK && v.Conjugation != ""
	}
	return
}

func reduceActionVerbSetExceptions(state EditState, action ActionVerbSetExceptions) (newState EditState, err error) {
	if state.Word == nil {
		err = errors.New("word is not set")
		return
	}
	newState = state
	newState.Word.Verb.PPP = action.PPP
	newState.Word.Verb.Perfect = action.Perfect
	newState.Word.Verb.Praeteritum = action.Praeteritum
	return
}
func reduceActionVerbSetConjugation(state EditState, action ActionVerbSetConjugation) (newState EditState, err error) {
	if state.Word == nil {
		err = errors.New("word is not set")
		return
	}
	newState = state
	newState.Word.Verb.Conjugation = action.Conjugation
	return
}
func reduceActionSetGenitive(state EditState, action ActionSetGenitive) (newState EditState, err error) {
	if state.Word.Noun == nil {
		err = errors.New("word is not a noun, can not set genitive")
		return
	}
	newState = state
	newState.Word.Noun.Genitive = action.Genitive
	return
}

func reduceActionSetUnit(state EditState, action ActionSetUnit) (newState EditState, err error) {
	if state.Word == nil {
		err = errors.New("no word no unit")
		return
	}
	newState = state
	newState.Word.Unit = action.Unit
	return
}

func reduceActionNewWord(state EditState, action ActionNewWord) (newState EditState, err error) {
	newState = EditState{
		Word: &services.Word{
			Unit: action.Unit,
		},
	}
	return
}

func reduceActionSetWordID(state EditState, action ActionSetWordID) (newState EditState, err error) {
	newState = state
	newState.Word.ID = action.ID
	return
}

func reduceActionSetWord(state EditState, action ActionSetWord) (newState EditState, err error) {
	if state.Word == nil {
		err = errors.New("word is not set")
		return
	}
	newState = state
	newState.Word.Word = action.Word
	return
}

func reduceActionSetDeclination(state EditState, action ActionSetDeclination) (newState EditState, err error) {
	if state.Word == nil {
		err = errors.New("word is not set")
		return
	}
	if state.Word.Noun == nil && state.Word.Adjective == nil {
		err = errors.New("word is not a noun or adjective, can not set declination")
		return
	}
	newState = state
	switch true {
	case newState.Word.Noun != nil:
		newState.Word.Noun.Declination = action.Declinations[0]
	case newState.Word.Adjective != nil:
		for _, decl := range action.Declinations {
			switch decl {
			case services.DeclinationA, services.DeclinationO, services.DeclinationThird:
				// ok
			default:
				err = errors.New("invalid declination for adjective")
				return
			}
		}
		newState.Word.Adjective.Declinations = action.Declinations
	}
	return
}

func reduceActionSetGender(state EditState, action ActionSetGender) (newState EditState, err error) {
	if state.Word == nil {
		err = errors.New("word is not set")
		return
	}
	switch action.Gender {
	case services.GenderFemale, services.GenderMale, services.GenderNeuter:
	default:
		err = errors.New("unknownn gender: " + string(action.Gender))
		return
	}

	switch true {
	case state.Word.Noun != nil:
		newState = state
		newState.Word.Noun.Gender = action.Gender
	case state.Word.Adjective != nil:
		newState = state
		newState.Word.Adjective.Gender = action.Gender
	default:
		err = errors.New("word type not supported to set a gender")
		return
	}
	return
}

func reduceActionAddTranslation(state EditState, action ActionAddTranslation) (newState EditState, err error) {
	if state.Word == nil {
		err = errors.New("word is not set")
		return
	}
	newState = state
	state.Word.Translations = append(state.Word.Translations, action.Translation)
	return
}

func reduceActionDeleteTranslation(state EditState, action ActionDeleteTranslation) (newState EditState, err error) {
	if state.Word == nil {
		err = errors.New("word is not set")
		return
	}
	newState = state
	filteredTranslations := []string{}
	for _, translation := range state.Word.Translations {
		if translation != action.Translation {
			filteredTranslations = append(filteredTranslations, translation)
		}
	}
	newState.Word.Translations = filteredTranslations
	return
}

func reduceActionSetType(state EditState, action ActionSetType) (newState EditState, err error) {
	newState = state
	switch action.WordType {
	case services.WordTypeAdjective:
		newState.Word = &services.Word{
			Translations: []string{},
			Adjective: &services.Adjective{
				Declinations: []services.Declination{},
			},
		}
	case services.WordTypeVerb:
		newState.Word = &services.Word{
			Translations: []string{},
			Verb:         &services.Verb{},
		}
	case services.WordTypeAdverb:
		newState.Word = &services.Word{
			Translations: []string{},
			Adverb:       &services.Adverb{},
		}
	case services.WordTypeNoun:
		newState.Word = &services.Word{
			Translations: []string{},
			Noun:         &services.Noun{},
		}
	default:
		err = errors.New("word type not implemented " + string(action.WordType))
	}
	newState.WordType = action.WordType
	if state.Word != nil {
		newState.Word.Unit = state.Word.Unit
		if len(state.Word.Translations) > 0 {
			newState.Word.Translations = state.Word.Translations
		}
	}
	return
}
