import React from "react";
import { connect } from "react-redux";
import { State } from "../store";

import { actionEditSet } from "../actions";
import { EditState } from "../services/vo/edit";
import { ServiceClient } from "../services/edit";
import { getClient } from "../transport";
import { RadioBar, Option } from "./RadioBar";
import { GoConst } from "../services/vo/services";

const InternalEditorDeclinations = (
  props: EditState & {
    declinations:Option[];
    selection: string;
    setDeclination?: (declination: string) => void;
  }
) => {
  return (
      <RadioBar
        onChangeSelection={s => {
          props.setDeclination(s);
        }}
        options={props.declinations}
        selection={props.selection}
      />
  );
};

const client = getClient(ServiceClient);

export const EditorDeclinations = connect(
  (state: State) => {
    let selection = "";
    switch(state.edit.WordType) {
      case GoConst.WordTypeAdjective:
        selection = state.edit.Word.Adjective.Declination;
        break;
      case GoConst.WordTypeNoun:
        selection = state.edit.Word.Noun.Declination;
        break;
    }
    return {...state.edit, selection}
  },
  dispatch => {
    const des = (newState: EditState) => {
      dispatch(actionEditSet(newState));
    };
    return {
      setDeclination: async (declination: string) => {
        des(await client.setDeclination(declination));
      },
    };
  }
)(InternalEditorDeclinations);
