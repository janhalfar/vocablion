import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";

import { actionPracticeSet } from "../../actions";
import { Button } from "../components";
import { ServiceClient } from "../../services/practice";
import { getClient } from "../../transport";
import { LocalFieldsState } from "../../reducers/localFields";
import { PracticeState } from "../../services/vo/practice";

const PracticeShowInternal = (
  props: PracticeState & {
    localFields: LocalFieldsState;
    next: () => void;
  }
) => {
  return (
    <Button width={"100%"} onClick={_e => props.next()}>show</Button>
  );
};

const client = getClient(ServiceClient);

export const PracticeShow = connect(
  (state: State) => ({ ...state.practice, localFields: state.localFields }),
  dispatch => {
    const des = (newState: PracticeState) => {
      dispatch(actionPracticeSet(newState));
    };
    return {
      next: async () => {
        des( await client.learn());
      },
    };
  }
)(PracticeShowInternal);
