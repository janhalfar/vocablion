import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";

import { actionEditSet } from "../../actions";
import { EditState } from "../../services/vo/edit";
import { ServiceClient } from "../../services/edit";
import { getClient } from "../../transport";
import { RadioBar, Option } from "../RadioBar";
import { GoConst } from "../../services/vo/services";

const InternalEditorDeclinations = (
  props: EditState & {
    declinations:Option[];
    selection: string;
    setDeclinations?: (declinations: string[]) => void;
  }
) => {
  return (
      <RadioBar
        bgColor="#707064"
        onChangeSelection={s => {
          if(typeof s === "string") {
            props.setDeclinations([s]);
          } else {
            props.setDeclinations(s);
          }
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
        selection = state.edit.Word.Adjective.Declinations;
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
      setDeclinations: async (declinations: string[]) => {
        des(await client.setDeclinations(declinations));
      },
    };
  }
)(InternalEditorDeclinations);
