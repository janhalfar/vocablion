import React from "react";
import { connect } from "react-redux";
import { State } from "../store";

import { actionEditSet } from "../actions";
import { Input} from "./components";
import { EditState } from "../services/vo/edit";
import { ServiceClient } from "../services/edit";
import { getClient } from "../transport";

const InternalEditorWord = (
  props: EditState & {
    placeholder:string;
    setWord: (word: string) => void;
  }
) => {
  return (
    <div>
      <Input
        placeholder={props.placeholder}
        value={props.Word.Word}
        onChange={e => props.setWord(e.target.value)}
      />

    </div>
  );
};

const client = getClient(ServiceClient);

export const EditorWord = connect(
  (state: State) => state.edit,
  dispatch => {
    const des = (newState: EditState) => {
      dispatch(actionEditSet(newState));
    };
    return {
      setWord: async (word: string) => {
        des(await client.setWord(word));
      },

    };
  }
)(InternalEditorWord);
