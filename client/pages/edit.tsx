import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Page, Title } from "../components/components";
import { State } from "../store";
import { RadioBar } from "../components/RadioBar";
import { actionEditSet } from "../actions";
import { GoConst } from "../services/vo/services";
import { EditorNoun } from "../components/EditorNoun";
import { getClient } from "../transport";
import { ServiceClient } from "../services/edit";
import { EditState } from "../services/vo/edit";
import { EditorVerb } from "../components/EditorVerb";
import { EditorAdjective } from "../components/EditorAdjective";
import { EditorUnit } from "../components/EditorUnit";

const editorForType = (wordType:string) => {
  switch(wordType) {
    case GoConst.WordTypeNoun: return <EditorNoun/>;
    case GoConst.WordTypeVerb: return <EditorVerb/>;
    case GoConst.WordTypeAdjective: return <EditorAdjective/>;
    default: return <h2>Select a word type</h2>;
  }
}

const Edit = (props: EditState & {setWordType:(wordType:string)=> void;}) => {
  return (
    <Page>
      <Title>Edit</Title>
      <EditorUnit/>
      <RadioBar
        onChangeSelection={s => {
          props.setWordType(s);
        }}
        options={[
          { label: "Noun", value: GoConst.WordTypeNoun },
          { label: "Verb", value: GoConst.WordTypeVerb},
          { label: "Adjective", value: GoConst.WordTypeAdjective},
          { label: "Pronoun", value: GoConst.WordTypePronoun },
        ]}
        selection={props.WordType}
      />
      {editorForType(props.WordType)}
    </Page>
  );
};

export default connect((state: State) => state.edit,
 dispatch => ({
    setWordType: async (wordType:string) => {
      try {
        dispatch(actionEditSet(await getClient(ServiceClient).setType(wordType)));
      } catch(e) {
        console.error(e);
      }
    }
  }))(Edit);
