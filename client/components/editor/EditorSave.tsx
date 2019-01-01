import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";

import { actionEditSet } from "../../actions";
import { Button } from "../components";
import { EditState } from "../../services/vo/edit";
import { ServiceClient } from "../../services/edit";
import { getClient } from "../../transport";

const EditorSaveInternal = (
  props: EditState & {
    save: () => void;
  }
) => {
  return (
    <React.Fragment>
      {props.Valid ? (
        <Button onClick={e => props.save()}>save</Button>
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
      save: async () => {
        des(await client.saveWord());
      }
    };
  }
)(EditorSaveInternal);
