import { EditState } from "./services/vo/edit";
import { PracticeState } from "./services/vo/practice";

export const Actions = {
  EDIT_SET: "EDIT_SET",
  EDIT_RESET: "EDIT_ReSET",
  PRACTICE_SET: "PRACTICE_SET",
  SET_LOCAL_FIELDS: "SET_LOCAL_FIELDS",
  RESET_LOCAL_FIELDS: "RESET_LOCAL_FIELDS"
};

export const actionEditSet = (editState: EditState) => ({
  type: Actions.EDIT_SET,
  editState
});

export const actionEditReset = () => ({
  type: Actions.EDIT_RESET,
});

export const actionPracticeSet = (practiceState: PracticeState) => ({
  type: Actions.PRACTICE_SET,
  practiceState
});


export const actionResetLocalFields = () => ({type:Actions.RESET_LOCAL_FIELDS});
export const actionSetLocalFields = (fields: { [index: string]: string }) => ({
  type: Actions.SET_LOCAL_FIELDS,
  fields
});
