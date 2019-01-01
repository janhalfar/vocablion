import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";

import { actionEditSet } from "../../actions";
import { EditState } from "../../services/vo/edit";
import { ServiceClient } from "../../services/edit";
import { getClient } from "../../transport";
import { RadioBar, Option } from "../RadioBar";
import { GoConst } from "../../services/vo/services";

const InternalEditorGender = (
  props: EditState & {
    selection: string;
    setGender: (gender: string) => void;
  }
) => {
  return (
    <RadioBar
      onChangeSelection={s => {
        props.setGender(s);
      }}
      options={[
        { label: "female", value: GoConst.GenderFemale },
        { label: "male", value: GoConst.GenderMale },
        { label: "neuter", value: GoConst.GenderNeuter }
      ]}
      selection={props.selection}
    />
  );
};

const client = getClient(ServiceClient);

export const EditorGender = connect(
  (state: State) => {
    let selection = "";
    switch (state.edit.WordType) {
      case GoConst.WordTypeAdjective:
        selection = state.edit.Word.Adjective.Gender;
        break;
      case GoConst.WordTypeNoun:
        selection = state.edit.Word.Noun.Gender;
        break;
    }
    return { ...state.edit, selection };
  },
  dispatch => {
    const des = (newState: EditState) => {
      dispatch(actionEditSet(newState));
    };
    return {
      setGender: async (gender: string) => {
        des(await client.setGender(gender));
      }
    };
  }
)(InternalEditorGender);
