import React from "react";

import { Word } from "../../services/vo/services";
import {
  wordType,
  wordInfo,
  Question,
  ButtonSmall,
  gotoWord
} from "../components";
import styled from "styled-components";

const Card = styled.div`
  padding: 0.5rem 1rem 1rem 1rem;
  margin: 1rem 0;
  background: #efefef;

  position: relative;
  border-radius: 2px;

  ::before,
  ::after {
    content: "";
    position: absolute;
    bottom: 10px;
    width: 40%;
    height: 10px;
    box-shadow: 0 5px 14px rgba(0, 0, 0, 0.5);
    z-index: -1;
    transition: all 0.3s ease-in-out;
  }

  ::before {
    left: 15px;
    transform: skew(-5deg) rotate(-5deg);
  }

  ::after {
    right: 15px;
    transform: skew(5deg) rotate(5deg);
  }

  :hover::before,
  :hover::after {
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.4);
  }

  :hover::before {
    left: 5px;
  }

  :hover::after {
    right: 5px;
  }
`;

export const Learn = (props: { word: Word }) => {
  return (
    <Card>
      <Question>{props.word.Word}</Question>
      <p>
        {wordType(props.word)} - {wordInfo(props.word)}
      </p>
      <p>{props.word.Translations.join(", ")}</p>
      <ButtonSmall onClick={_e => gotoWord(props.word.ID)}>edit</ButtonSmall>
    </Card>
  );
};
