import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";

import { actionEditSet, actionEditReset } from "../../actions";
import { Button } from "../components";
import { EditState } from "../../services/vo/edit";
import { ServiceClient } from "../../services/edit";
import { getClient } from "../../transport";
import { GoConst } from "../../services/vo/services";

const EditorSaveInternal = (
  props: EditState & {
    save: (newWordUnit:string) => void;
  }
) => {
  return (
    <React.Fragment>
      {props.Valid ? (
        <Button onClick={e => props.save(props.Word ?props.Word.Unit: "")}>save</Button>
      ) : (
        "not valid"
      )}
    </React.Fragment>
  );
};

const client = getClient(ServiceClient);

export const EditorSave= connect(
  (state: State) => state.edit,
  dispatch => {
    const des = (newState: EditState) => {
      dispatch(actionEditSet(newState));
    };
    return {
      save: async (newWordUnit:string) => {
        des(await client.saveWord());
        des(await client.newWord(newWordUnit));
      }
    };
  }
)(EditorSaveInternal);
