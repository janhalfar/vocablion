import React from "react";
import { connect } from "react-redux";
import { State } from "../store";

import {
  actionEditSet,
  actionSetLocalFields,
  actionPracticeSet,
  actionPracticeSetTranslations
} from "../actions";
import { Input, ButtonSmall } from "./components";
import { EditState } from "../services/vo/edit";
import { ServiceClient as EditClient } from "../services/edit";
import { getClient } from "../transport";
import { LocalFieldsState } from "../reducers/localFields";
import { PracticeState } from "../services/vo/practice";
import styled from "styled-components";

const Translations = styled.div``;
const Translation = styled.div`
  padding: 0.3rem;
  font-size: 1.5rem;
  :nth-child(odd) {
    background-color: grey;
  }
  span {
    float: left;
  }
  button {
    float: right;
  }
  div {
    clear: both;
  }
`;

const InternalEditorTranslations = (props: {
  translations: string[];
  localFields: LocalFieldsState;
  setTranslation: (translation: string) => void;
  submitTranslation?: (translation: string) => void;
  submitTranslations?: (translations: string[]) => void;
  deleteTranslation: (translation: string) => void;
}) => {
  return (
    <React.Fragment>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (props.submitTranslation) {
            props.submitTranslation(props.localFields.translation);
          } else if (props.submitTranslations) {
            props.submitTranslations(
              props.translations.concat(props.localFields.translation)
            );
          }
        }}
      >
        <Input
          placeholder="add a translation"
          onChange={e => props.setTranslation(e.target.value)}
          value={props.localFields.translation}
        />
      </form>
      <Translations>
        {props.translations.map(t => (
          <Translation key={t}>
            <span onClick={_e => props.setTranslation(t)}>{t}</span>{" "}
            <ButtonSmall danger onClick={e => props.deleteTranslation(t)}>
              delete
            </ButtonSmall>
            <div></div>
          </Translation>
        ))}
      </Translations>
    </React.Fragment>
  );
};

const clientEdit = getClient(EditClient);

export const EditorTranslations = connect(
  (state: State) => ({
    translations: state.edit.Word ? state.edit.Word.Translations : [],
    localFields: state.localFields
  }),
  dispatch => {
    const des = (newState: EditState) => {
      dispatch(actionEditSet(newState));
    };
    return {
      setTranslation: async (translation: string) => {
        dispatch(actionSetLocalFields({ translation }));
      },
      submitTranslation: async (translation: string) => {
        dispatch(actionSetLocalFields({ translation: "" }));
        des(await clientEdit.addTranslation(translation));
      },
      deleteTranslation: async (translation: string) => {
        des(await clientEdit.deleteTranslation(translation));
      }
    };
  }
)(InternalEditorTranslations);

export const PracticeTranslations = connect(
  (state: State) => ({
    translations: state.practice.translations,
    localFields: state.localFields
  }),
  dispatch => {
    // const des = (newState: PracticeState) => {
    //   dispatch(actionPracticeSet(newState));
    // };
    return {
      setTranslation: async (translation: string) => {
        dispatch(actionSetLocalFields({ translation }));
      },
      submitTranslations: async (translations: string[]) => {
        dispatch(actionPracticeSetTranslations(translations));
        dispatch(actionSetLocalFields({ translation: "" }));
        //des(await client.addTranslation(translation));
      },
      deleteTranslation: async (translation: string) => {
        //des(await client.deleteTranslation(translation));
      }
    };
  }
)(InternalEditorTranslations);
