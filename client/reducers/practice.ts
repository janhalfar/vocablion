import { AnyAction } from "redux";
import { Actions } from "../actions";
import { PracticeState } from "../services/vo/practice";

export const practiceReducer = (
  state: PracticeState = {
    Question: "",
    WordType: "",
    Translations: [],
    Feedback : {
      Complete: false,
      ProgessTranslations: {
        Complete: false,
        Total: 0,
        Wrong: 0,
        Correct: 0,
      },
    },
  },
  action: AnyAction
): PracticeState => {
  switch (action.type) {
    case Actions.PRACTICE_SET: return action.practiceState;
  }
  return state;
};
