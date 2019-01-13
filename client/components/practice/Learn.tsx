import React from "react";

import { Word } from "../../services/vo/services";
import { wordType, wordInfo } from "../components";
import styled from "styled-components";

const Card = styled.div`
  background-color: white;
  padding: .5rem 1rem 1rem 1rem;
  margin: 1rem 0;
`;

export const Learn = (props: { word: Word }) => {
  return (
    <Card>
      <h2>
        {props.word.Word}, {wordType(props.word)} - {wordInfo(props.word)}
      </h2>
      <p>{props.word.Translations.join(", ")}</p>
    </Card>
  );
};
