import React from "react";
import { connect } from "react-redux";
import { State } from "../store";

import { actionEditSet, actionSetLocalFields } from "../actions";
import { Input, List, ListItem, Button, ButtonSmall } from "./components";
import { EditState } from "../services/vo/edit";
import { ServiceClient } from "../services/edit";
import { getClient } from "../transport";
import { LocalFieldsState } from "../reducers/localFields";

const InternalEditorTranslations = (
  props: EditState & {
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
          props.submitTranslation(props.localFields.translation);
        }}
      >
        <Input
          placeholder="add a translation"
          onChange={e => props.setTranslation(e.target.value)}
          value={props.localFields.translation}
        />
      </form>
      <List>
        {props.Word.Translations.map(t => (
          <ListItem>
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

const client = getClient(ServiceClient);

export const EditorTranslations = connect(
  (state: State) => ({ ...state.edit, localFields: state.localFields }),
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
        des(await client.addTranslation(translation));
      },
      deleteTranslation: async (translation: string) => {
        des(await client.deleteTranslation(translation));
      }
    };
  }
)(InternalEditorTranslations);
