import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Page, Title } from "../components/components";
import { State } from "../store";
import { EditState, WordType } from "../reducers/edit";
import { RadioBar } from "../components/RadioBar";
import { actionEditSetType } from "../actions";
import { GoConst } from "../services/vo/services";
import { EditorNoun } from "../components/EditorNoun";

const editorForType = (wordType:WordType) => {
  switch(wordType) {
    case WordType.Noun: return <EditorNoun/>;
  }
}

const Edit = (props: EditState & {setWordType:(wordType:WordType)=> void;}) => {
  return (
    <Page>
      <Title>Edit</Title>
      <RadioBar
        onChangeSelection={s => {
          props.setWordType(s);
        }}
        options={[
          { label: "Noun", value: WordType.Noun },
          { label: "Verb", value: WordType.Verb},
          { label: "Adjective", value: WordType.Adjective},
          { label: "Pronoun", value: WordType.Pronoun },
        ]}
        selection={props.wordType}
        />
      {editorForType(props.wordType)}
    </Page>
  );
};

export default connect((state: State) => state.edit,
 dispatch => ({
    setWordType: (wordType:WordType) => {
      dispatch(actionEditSetType(wordType));
    }
  }))(Edit);
