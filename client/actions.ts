import { EditState } from "./services/vo/edit";
import { PracticeState } from "./services/vo/practice";
import { WordsState } from "./services/vo/words";
import { StatusState } from "./services/vo/status";

export const Actions = {
  EDIT_SET: "EDIT_SET",
  WORDS_SET: "WORDS_SET",
  STATUS_SET: "STATUS_SET",
  EDIT_RESET: "EDIT_ReSET",
  PRACTICE_SET: "PRACTICE_SET",
  PRACTICE_SET_TRANSLATIONS: "PRACTICE_SET_TRANSLATIONS",
  SET_LOCAL_FIELDS: "SET_LOCAL_FIELDS",
  RESET_LOCAL_FIELDS: "RESET_LOCAL_FIELDS"
};

export const actionWordsSet = (wordsState: WordsState) => ({
  type: Actions.WORDS_SET,
  wordsState
});

export const actionEditSet = (editState: EditState) => ({
  type: Actions.EDIT_SET,
  editState
});

export const actionStatusSet = (statusState: StatusState) => ({
  type: Actions.STATUS_SET,
  statusState
});

export const actionEditReset = () => ({
  type: Actions.EDIT_RESET
});

export const actionPracticeSet = (practiceState: PracticeState) => ({
  type: Actions.PRACTICE_SET,
  practiceState
});

export const actionPracticeSetTranslations = (translations: string[]) => ({
  type: Actions.PRACTICE_SET_TRANSLATIONS,
  translations
});

export const actionResetLocalFields = () => ({
  type: Actions.RESET_LOCAL_FIELDS
});
export const actionSetLocalFields = (fields: { [index: string]: string }) => ({
  type: Actions.SET_LOCAL_FIELDS,
  fields
});
