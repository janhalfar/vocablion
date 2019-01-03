import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";

import { actionEditSet } from "../../actions";
import { GoConst } from "../../services/vo/services";
import { EditState } from "../../services/vo/edit";
import { ServiceClient } from "../../services/edit";
import { getClient } from "../../transport";
import { LocalFieldsState } from "../../reducers/localFields";
import { EditorTranslations } from "../translations";
import { EditorWord } from "./EditorWord";
import { EditorSave } from "./EditorSave";
import { EditorDeclinations } from "./EditorDeclinations";
import { EditorGender } from "./EditorGender";

const EditorAdjectiveInternal = (
  props: EditState & {
    localFields: LocalFieldsState;
    deleteTranslation: (translation: string) => void;
  }
) => {
  return (
    <div>
      <EditorWord placeholder="adjective"/>
      <EditorDeclinations
        declinations={[
          { label: "a", value: GoConst.DeclinationA },
          { label: "o", value: GoConst.DeclinationO },
          { label: "third", value: GoConst.DeclinationThird },
        ]}
      />
      <EditorGender/>
      <EditorTranslations/>
      <EditorSave/>

    </div>
  );
};

const client = getClient(ServiceClient);

export const EditorAdjective= connect(
  (state: State) => state.edit,
  dispatch => {
    const des = (newState: EditState) => {
      dispatch(actionEditSet(newState));
    };
    return {
    };
  }
)(EditorAdjectiveInternal);
