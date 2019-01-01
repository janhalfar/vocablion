import { AnyAction } from "redux";
import { Actions } from "../actions";

export interface LocalFieldsState {
    translation : string;
    genitive : string;
}

const emptyFields = ():LocalFieldsState => ({
    translation: "",
    genitive: "",
})

export const localFieldsReducer = (
  state: LocalFieldsState = emptyFields(),
  action: AnyAction
): LocalFieldsState => {
  switch (action.type) {
    case Actions.RESET_LOCAL_FIELDS:
        return emptyFields();
    case Actions.SET_LOCAL_FIELDS: 
        return {...state, ...action.fields};
  }
  return state;
};
