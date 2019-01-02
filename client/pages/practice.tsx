import React from "react";
import styled from "styled-components";
import { Button, Page, Title, Input } from "../components/components";
import { PracticeNext } from "../components/practice/Next";
import { State } from "../store";
import { connect } from "react-redux";
import { PracticeState } from "../services/vo/practice";
import { actionPracticeSet } from "../actions";

const Question = styled.h2`
  font-size: 1.5rem;
`;

const ButtonOK = styled(Button)`
  background-color: #5bbf66;
`;

const InternalPractice = (props: PracticeState) => (
  <Page>
    <Title>Übersetze</Title>
    <Question>{props.Question}</Question>
    <Input placeholder="..." />
    <ButtonOK>OK</ButtonOK>
    <PracticeNext />
  </Page>
);

export default connect(
  (state: State) => state.practice,
  dispatch => {
    const des = (newState: PracticeState) => {
      dispatch(actionPracticeSet(newState));
    };
    return {};
  }
)(InternalPractice);
