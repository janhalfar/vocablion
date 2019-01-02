import { AnyAction } from "redux";
import { Actions } from "../actions";
import { EditState } from "../services/vo/edit";


const emptyState = ():EditState => ({
  Valid: false,
  WordType: "",
});

export const editReducer = (
  state: EditState = emptyState(),
  action: AnyAction
): EditState => {
  switch (action.type) {
    case Actions.EDIT_RESET: return emptyState();
    case Actions.EDIT_SET: return action.editState;
  }
  return state;
};
