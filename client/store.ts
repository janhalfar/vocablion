import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { editReducer, EditState } from "./reducers/edit";

export interface State {
  edit: EditState;
}

export function initializeStore(initialState = {}) {
  return createStore(
    combineReducers({
      edit: editReducer,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
