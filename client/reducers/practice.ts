import { AnyAction } from "redux";
import { Actions } from "../actions";
import { PracticeState as ServicePracticeState } from "../services/vo/practice";

export interface PracticeState extends ServicePracticeState {
  translations : string[];
}


export const practiceReducer = (
  state: PracticeState = {
    Question: "",
    WordType: "",
    Translations: [],
    translations: [],
    Feedback : {
      Complete: false,
      ProgessTranslations: {
        Complete: false,
        Total: 0,
        Wrong: [],
        Correct: [],
      },
    },
  },
  action: AnyAction
): PracticeState => {
  switch (action.type) {
    case Actions.PRACTICE_SET: return {...action.practiceState, translations:[]};
    case Actions.PRACTICE_SET_TRANSLATIONS:
      return {...state, ...{translations:action.translations}};
  }
  return state;
};
