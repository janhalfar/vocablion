import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";

import { actionPracticeSet } from "../../actions";
import { Button } from "../components";
import { ServiceClient } from "../../services/practice";
import { getClient } from "../../transport";
import { LocalFieldsState } from "../../reducers/localFields";
import { PracticeState } from "../../services/vo/practice";

const PracticeNextInternal = (
  props: PracticeState & {
    localFields: LocalFieldsState;
    next: () => void;
  }
) => {
  return (
    <Button onClick={_e => props.next()}>Next</Button>
  );
};

const client = getClient(ServiceClient);

export const PracticeNext = connect(
  (state: State) => ({ ...state.practice, localFields: state.localFields }),
  dispatch => {
    const des = (newState: PracticeState) => {
      dispatch(actionPracticeSet(newState));
    };
    return {
      next: async () => {
        des( await client.next());
      },
    };
  }
)(PracticeNextInternal);
