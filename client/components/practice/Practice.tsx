import React from "react";
import styled from "styled-components";
import { PracticeState } from "../../reducers/practice";
import { ServiceClient } from "../../services/practice";
import { getClient } from "../../transport";
import { Button, ButtonBarVertical } from "../components";
import { PracticeTranslations } from "../translations";
import { PracticeShow } from "./Show";
import { connect } from "react-redux";
import { State } from "../../store";
import { actionPracticeSet } from "../../actions";

const Question = styled.h2`
  font-size: 1.5rem;
`;

const ButtonOK = styled(Button)`
  background-color: #5bbf66;
  width: 100%;
`;

interface PracticeProps extends PracticeState {
  answer: (translations: string[]) => void;
}

const practiceClient = getClient(ServiceClient);

const InternalPractice = (props: PracticeProps) => (
  <React.Fragment>
    <Question>{props.Question}</Question>
    <PracticeTranslations />
    <ButtonBarVertical>
      {props.translations.length > 0 && (
        <ButtonOK onClick={_e => props.answer(props.translations)}>ok</ButtonOK>
      )}
      <PracticeShow />
    </ButtonBarVertical>
  </React.Fragment>
);

export const Practice = connect(
  (state: State) => state.practice,
  dispatch => {
    const des = (newState: PracticeState) => {
      dispatch(actionPracticeSet(newState));
    };
    return {
      answer: async (translations: string[]) => {
        des(await practiceClient.answer(translations));
      }
    };
  }
)(InternalPractice);
