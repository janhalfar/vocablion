import { WordType } from "./reducers/edit";

export const Actions = {
    EDIT_SET_TYPE : "EDIT_SET_TYPE",
    EDIT_NOUN_SET_DECLINATION : "EDIT_NOUN_SET_DECLINATION",
    EDIT_NOUN_SET_PLURAL_WORD : "EDIT_NOUN_SET_PLURAL_WORD",
    EDIT_NOUN_TRANSLATION_SET : "EDIT_NOUN_SET_PLURAL_WORD",
    EDIT_NOUN_TRANSLATION_DELETE : "EDIT_NOUN_TRANSLATION_DELETE",
    EDIT_NOUN_TRANSLATION_SUBMIT : "EDIT_NOUN_TRANSLATION_SUBMIT",
    EDIT_NOUN_SET_WORD : "EDIT_NOUN_SET_WORD",
    EDIT_NOUN_SET_GENITIVE : "EDIT_NOUN_SET_GENITIV",
    EDIT_NOUN_SET_SEX : "EDIT_NOUN_SET_SEX",
    EDIT_LOAD_WORD : "EDIT_LOAD_WORD",
}

export const actionEditSetType = (wordType: WordType) => ({
    type: Actions.EDIT_SET_TYPE,
    wordType,
});
export const actionEditNounSetDeclination = (declination: string) => ({
    type: Actions.EDIT_NOUN_SET_DECLINATION,
    declination,
});
export const actionEditNounSetSex = (sex: string) => ({
    type: Actions.EDIT_NOUN_SET_SEX,
    sex,
});

export const actionEditNounSetGenitive = (genitiv: string) => ({
    type: Actions.EDIT_NOUN_SET_GENITIVE,
    genitiv,
});

export const actionEditNounSetWord = (word: string) => ({
    type: Actions.EDIT_NOUN_SET_WORD,
    word,
});

export const actionEditNounTranslationSet = (translation: string) => ({
    type: Actions.EDIT_NOUN_TRANSLATION_SET,
    translation,
});

export const actionEditNounTranslationSubmit = () => ({
    type: Actions.EDIT_NOUN_TRANSLATION_SUBMIT,
});

export const actionEditNounTranslationDelete = (translation: string) => ({
    type: Actions.EDIT_NOUN_TRANSLATION_DELETE,
    translation,
});

