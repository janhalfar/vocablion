import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";

import { actionEditSet } from "../../actions";
import { Button } from "../components";
import { EditState } from "../../services/vo/edit";
import { ServiceClient } from "../../services/edit";
import { getClient } from "../../transport";
import styled from "styled-components";

const SaveButton = styled(Button)`
  width: 100%;
  background-color: darkgreen;
`

const EditorSaveInternal = (
  props: EditState & {
    save: (newWordUnit:string) => void;
  }
) => {
  return (
    <React.Fragment>
      {props.Valid ? (
        <SaveButton onClick={_e => props.save(props.Word ?props.Word.Unit: "")}>save</SaveButton>
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
