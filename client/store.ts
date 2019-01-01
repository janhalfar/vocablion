import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { editReducer } from "./reducers/edit";
import { EditState } from "./services/vo/edit";
import { LocalFieldsState, localFieldsReducer } from "./reducers/localFields";

export interface State {
  edit: EditState;
  localFields: LocalFieldsState;
}

export function initializeStore(initialState = {}) {
  return createStore(
    combineReducers({
      edit: editReducer,
      localFields: localFieldsReducer,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
