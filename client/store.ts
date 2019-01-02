import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { editReducer } from "./reducers/edit";
import { EditState } from "./services/vo/edit";
import { LocalFieldsState, localFieldsReducer } from "./reducers/localFields";
import { PracticeState } from "./services/vo/practice";
import { practiceReducer } from "./reducers/practice";
import { WordsState } from "./services/vo/words";
import { wordsReducer } from "./reducers/words";

export interface State {
  edit: EditState;
  practice: PracticeState;
  localFields: LocalFieldsState;
  words: WordsState;
}

export function initializeStore(initialState = {}) {
  return createStore(
    combineReducers({
      edit: editReducer,
      localFields: localFieldsReducer,
      practice: practiceReducer,
      words: wordsReducer,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
