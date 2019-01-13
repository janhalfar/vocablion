import React from "react";

import { Word } from "../../services/vo/services";
import { wordType, wordInfo } from "../components";

export const Learn = (props: { word: Word }) => {
  return (
    <React.Fragment>
      <h2>
        {props.word.Word}, {wordType(props.word)} - {wordInfo(props.word)}
      </h2>
      <h3>Translations</h3>
      <p>{props.word.Translations.join(", ")}</p>
    </React.Fragment>
  );
};
