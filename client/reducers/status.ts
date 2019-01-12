import { AnyAction } from "redux";
import { Actions } from "../actions";
import { StatusState } from "../services/vo/status";

const emptyState = (): StatusState => ({
});

export const statusReducer = (
  state: StatusState = emptyState(),
  action: AnyAction
): StatusState => {
  switch (action.type) {
    case Actions.STATUS_SET:
      return action.statusState;
  }
  return state;
};
