import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";

import { RadioBar } from "../RadioBar";
import { actionEditSet, actionSetLocalFields } from "../../actions";
import { GoConst, Verb } from "../../services/vo/services";
import { Input, List, ListItem, Button } from "../components";
import { EditState } from "../../services/vo/edit";
import { ServiceClient } from "../../services/edit";
import { getClient } from "../../transport";
import { LocalFieldsState } from "../../reducers/localFields";
import { EditorTranslations } from "../translations";
import { EditorWord } from "./EditorWord";
import { EditorSave } from "./EditorSave";

const EditorPhraseInternal = (
  props: EditState & {
    localFields: LocalFieldsState;
    setInfo: (info: string) => void;
  }
) => {
  return (
    <div>
      <EditorWord placeholder="phrase" />
      <Input
        placeholder="info"
        onChange={e =>
          props.setInfo(
            e.target.value,
          )
        }
        value={props.Word.Phrase.Info}
      />
      <EditorTranslations />
      <EditorSave />
    </div>
  );
};

const client = getClient(ServiceClient);

export const EditorPhrase = connect(
  (state: State) => ({ ...state.edit, localFields: state.localFields }),
  dispatch => {
    const des = (newState: EditState) => {
      dispatch(actionEditSet(newState));
    };
    return {
      setInfo: async (info:string) => des(await client.setPhraseInfo(info)),
    }
  }
)(EditorPhraseInternal);
