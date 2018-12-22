import { AnyAction } from "redux";
import { Actions } from "../actions";
import { Word } from "../services/vo/services";

export enum WordType {
  None,
  Noun,
  Verb,
  Pronoun,
  Adjective
}

export interface EditState {
  wordType: WordType;
  word?: Word;
  translation: string;
}

const setNounProp = (state: EditState, prop) => ({
  ...state,
  word: {
    Noun: {
      ...state.word.Noun,
      ...prop
    }
  }
});

export const editReducer = (
  state: EditState = {
    wordType: WordType.None,
    translation: ""
  },
  action: AnyAction
) => {
  switch (action.type) {
    case Actions.EDIT_NOUN_TRANSLATION_DELETE:
      return setNounProp(state, {
        Translations: state.word.Noun.Translations.filter(
          e => e !== action.translation
        )
      });
    case Actions.EDIT_NOUN_TRANSLATION_SET:
      return { ...state, translation: action.translation };
    case Actions.EDIT_NOUN_TRANSLATION_SUBMIT:
      return {
        ...setNounProp(state, {
          Translations: state.word.Noun.Translations.concat(state.translation)
        }),
        translation: "",
      };
    case Actions.EDIT_NOUN_SET_WORD:
      return setNounProp(state, { Word: action.word });
    case Actions.EDIT_NOUN_SET_GENITIVE:
      return setNounProp(state, { Genitive: action.genitiv });
    case Actions.EDIT_NOUN_SET_PLURAL_WORD:
      return setNounProp(state, { PluralWord: action.pluralWord });
    case Actions.EDIT_NOUN_SET_DECLINATION:
      return setNounProp(state, { Declination: action.declination });
    case Actions.EDIT_NOUN_SET_SEX:
      return setNounProp(state, { Sex: action.sex });
    case Actions.EDIT_SET_TYPE:
      let word: Word | undefined = undefined;
      switch (action.wordType) {
        case WordType.None:
          word = undefined;
          break;
        case WordType.Noun:
          word = {
            Unit: "",
            Noun: {
              Word: "",
              Genitive: "",
              PluralWord: false,
              Translations: [],
              Sex: "",
              Declination: ""
            }
          };
          break;
      }
      return { ...state, wordType: action.wordType, word, translation: "" };
  }
  return state;
};
