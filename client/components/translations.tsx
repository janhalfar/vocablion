import React from "react";
import { connect } from "react-redux";
import { State } from "../store";

import {
  actionEditSet,
  actionSetLocalFields,
  actionPracticeSetTranslations
} from "../actions";
import { Input, ButtonSmall } from "./components";
import { EditState } from "../services/vo/edit";
import { ServiceClient as EditClient } from "../services/edit";
import { getClient } from "../transport";
import { LocalFieldsState } from "../reducers/localFields";
import styled from "styled-components";

const Translations = styled.div`
  margin: .5rem 0 1rem 0;
`;
const Translation = styled.div`
  padding: 0.3rem;
  font-size: 1.5rem;
  border-top: 1px solid darkgray;
  :first-child {
    border-top: none;
  }
  :nth-child(odd) {
    background-color: lightgray;
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
  deleteTranslation?: (translation: string) => void;
  deleteTranslationInList?: (translations:string[], translation: string) => void;

}) => {
  return (
    <React.Fragment>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (props.localFields.translation == "") {
            return;
          }
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
            <ButtonSmall
              danger
              onClick={e => {
                if(props.deleteTranslation) {
                  props.deleteTranslation(t);
                } else if(props.deleteTranslationInList) {
                  props.deleteTranslationInList(props.translations, t);
                } else {
                  console.warn("can not delete translation", t);
                }
              }}
            >
              delete
            </ButtonSmall>
            <div />
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
    return {
      setTranslation:  (translation: string) => {
        dispatch(actionSetLocalFields({ translation }));
      },
      submitTranslations:  (translations: string[]) => {
        dispatch(actionPracticeSetTranslations(translations));
        dispatch(actionSetLocalFields({ translation: "" }));
        //des(await client.addTranslation(translation));
      },
      deleteTranslationInList: (translations: string[], translation: string) => {
        dispatch(actionPracticeSetTranslations(translations.filter(t => t != translation)));
      }
    };
  }
)(InternalEditorTranslations);
