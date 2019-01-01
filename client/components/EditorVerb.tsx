import React from "react";
import { connect } from "react-redux";
import { State } from "../store";

import { RadioBar } from "../components/RadioBar";
import { actionEditSet, actionSetLocalFields } from "../actions";
import { GoConst, Verb } from "../services/vo/services";
import { Input, List, ListItem, Button } from "./components";
import { EditState } from "../services/vo/edit";
import { ServiceClient } from "../services/edit";
import { getClient } from "../transport";
import { LocalFieldsState } from "../reducers/localFields";
import { EditorTranslations } from "./EditorTranslations";
import { EditorWord } from "./EditorWord";
import { EditorSave } from "./EditorSave";

const EditorVerbInternal = (
  props: EditState & {
    localFields: LocalFieldsState;
    setException: (praeteritum: string, perfect: string, ppp: string) => void;
    setConjugation: (conjugation: string) => void;
  }
) => {
  return (
    <div>
      <EditorWord placeholder="verb" />
      <RadioBar
        onChangeSelection={s => {
          props.setConjugation(s);
        }}
        options={[
          { label: "A", value: GoConst.ConjugationA },
          { label: "E", value: GoConst.ConjugationE },
          { label: "I", value: GoConst.ConjugationI },
          { label: "Kons", value: GoConst.ConjugationKons },
          { label: "KonsExtI", value: GoConst.ConjugationKonsExtI }
        ]}
        selection={props.Word.Verb.Conjugation}
      />
      <Input
        placeholder="praeteritum"
        onChange={e =>
          props.setException(
            e.target.value,
            props.Word.Verb.Perfect,
            props.Word.Verb.PPP
          )
        }
        value={props.localFields.praeteritum}
      />
      <Input
        placeholder="perfect"
        onChange={e =>
          props.setException(
            props.Word.Verb.Praeteritum,
            e.target.value,
            props.Word.Verb.PPP
          )
        }
        value={props.localFields.perfect}
      />
      <Input
        placeholder="ppp"
        onChange={e =>
          props.setException(
            props.Word.Verb.Praeteritum,
            props.Word.Verb.Perfect,
            e.target.value
          )
        }
        value={props.localFields.ppp}
      />
      <EditorTranslations />
      <EditorSave />
    </div>
  );
};

const client = getClient(ServiceClient);

export const EditorVerb = connect(
  (state: State) => ({ ...state.edit, localFields: state.localFields }),
  dispatch => {
    const des = (newState: EditState) => {
      dispatch(actionEditSet(newState));
    };
    return {
      setConjugation: async (conjugation:string) => des(await client.setVerbConjugation(conjugation)),
      setException: async (
        praeteritum: string,
        perfect: string,
        ppp: string
      ) => {
        des(await client.setVerbExcpetions(praeteritum, perfect, ppp));
      }
    };
  }
)(EditorVerbInternal);
