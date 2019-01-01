import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { editReducer } from "./reducers/edit";
import { EditState } from "./services/vo/edit";
import { LocalFieldsState, localFieldsReducer } from "./reducers/localFields";
import { PracticeState } from "./services/vo/practice";
import { practiceReducer } from "./reducers/practice";

export interface State {
  edit: EditState;
  practice: PracticeState;
  localFields: LocalFieldsState;
}

export function initializeStore(initialState = {}) {
  return createStore(
    combineReducers({
      edit: editReducer,
      localFields: localFieldsReducer,
      practice: practiceReducer,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
