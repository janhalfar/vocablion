import React from "react";
import styled from "styled-components";
import { Button, Page, Title, Input } from "../components/components";


const Question = styled.h2`
  font-size: 1.5rem;
`;

const ButtonOK = styled(Button)`
  background-color: #5bbf66;
`;
const ButtonCRAP = styled(Button)`
  background-color:#f05353;
`;
const SolutionList = styled.ul`
`;
const SolutionItem = styled.ul`
`;

const Practice = (props: {}) => {
  return (
    <Page>
      <Title>Übersetze</Title>
      <Question>laudare</Question>
      <Input placeholder="..." />
      <ButtonOK>OK</ButtonOK>
    </Page>
  );
};
/*
      <SolutionList>
        <SolutionItem>loben</SolutionItem>
      </SolutionList>
*/
export default Practice;
