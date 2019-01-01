import { AnyAction } from "redux";
import { Actions } from "../actions";
import { EditState } from "../services/vo/edit";



export const editReducer = (
  state: EditState = {},
  action: AnyAction
): EditState => {
  switch (action.type) {
    case Actions.EDIT_SET: return action.editState;
  }
  return state;
};
