import { AnyAction } from "redux";
import { Actions } from "../actions";
import { WordsState } from "../services/vo/words";

const emptyState = (): WordsState => ({
  Page: 0,
  Total:0 ,
  Query: "",
  Words: [],
});

export const wordsReducer = (
  state: WordsState = emptyState(),
  action: AnyAction
): WordsState => {
  switch (action.type) {
    case Actions.WORDS_SET:
      return action.wordsState;
  }
  return state;
};
