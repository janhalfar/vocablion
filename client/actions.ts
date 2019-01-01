import { EditState } from "./services/vo/edit";

export const Actions = {
  EDIT_SET: "EDIT_SET",
  SET_LOCAL_FIELDS: "SET_LOCAL_FIELDS",
  RESET_LOCAL_FIELDS: "RESET_LOCAL_FIELDS"
};

export const actionEditSet = (editState: EditState) => ({
  type: Actions.EDIT_SET,
  editState
});

export const actionResetLocalFields = () => ({type:Actions.RESET_LOCAL_FIELDS});
export const actionSetLocalFields = (fields: { [index: string]: string }) => ({
  type: Actions.SET_LOCAL_FIELDS,
  fields
});
