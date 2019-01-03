import React from "react";
import { connect } from "react-redux";
import { State } from "../store";

import { actionEditSet, actionSetLocalFields, actionPracticeSet, actionPracticeSetTranslations } from "../actions";
import { Input, List, ListItem, ButtonSmall } from "./components";
import { EditState } from "../services/vo/edit";
import { ServiceClient as EditClient } from "../services/edit";
import { ServiceClient as PracticeClient } from "../services/practice";
import { getClient } from "../transport";
import { LocalFieldsState } from "../reducers/localFields";
import { PracticeState } from "../services/vo/practice";

const InternalEditorTranslations = (
  props:  {
    translations: string[];
    localFields: LocalFieldsState;
    setTranslation: (translation: string) => void;
    submitTranslation: () => void;
    deleteTranslation: (translation: string) => void;
  }
) => {
  return (
    <React.Fragment>
      <h2>Translations</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          props.submitTranslation(props.translations.concat(props.localFields.translation));
        }}
      >
        <Input
          placeholder="add a translation"
          onChange={e => props.setTranslation(e.target.value)}
          value={props.localFields.translation}
        />
      </form>
      <List>
        {props.translations.map(t => (
          <ListItem key={t}>
            <span onClick={_e => props.setTranslation(t)}>
              {t}
            </span>{" "}
            <ButtonSmall onClick={e => props.deleteTranslation(t)}>
              Delete
            </ButtonSmall>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

const clientEdit = getClient(EditClient);

export const EditorTranslations = connect(
  (state: State) => ({ 
    translations: state.edit.Word.Translations, 
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

const clientPractice = getClient(PracticeClient);

export const PracticeTranslations = connect(
  (state: State) => ({ translations: state.practice.translations, localFields: state.localFields }),
  dispatch => {
    const des = (newState: PracticeState) => {
      dispatch(actionPracticeSet(newState));
    };
    return {
      setTranslation: async (translation: string) => {
        dispatch(actionSetLocalFields({ translation }));
      },
      submitTranslation: async (translations: string[]) => {
        dispatch(actionPracticeSetTranslations(translations))
        dispatch(actionSetLocalFields({ translation: "" }));
        //des(await client.addTranslation(translation));
      },
      deleteTranslation: async (translation: string) => {
        //des(await client.deleteTranslation(translation));
      }
    };
  }
)(InternalEditorTranslations);
