import React from "react";
import { connect } from "react-redux";
import { State } from "../store";

import { actionEditSet } from "../actions";
import { Input} from "./components";
import { EditState } from "../services/vo/edit";
import { ServiceClient } from "../services/edit";
import { getClient } from "../transport";

const InternalEditorUnit = (
  props: EditState & {
    setUnit: (unit: string) => void;
  }
) => {
  return (
    <div>
      <Input
        placeholder="unit"
        value={props.Word && props.Word.Unit}
        onChange={e => props.setUnit(e.target.value)}
      />
    </div>
  );
};

const client = getClient(ServiceClient);

export const EditorUnit = connect(
  (state: State) => state.edit,
  dispatch => {
    const des = (newState: EditState) => {
      dispatch(actionEditSet(newState));
    };
    return {
      setUnit: async (unit: string) => {
        des(await client.setUnit(unit));
      },

    };
  }
)(InternalEditorUnit);
