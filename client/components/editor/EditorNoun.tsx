import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";

import { RadioBar } from "../RadioBar";
import { actionEditSet } from "../../actions";
import { GoConst } from "../../services/vo/services";
import { Input } from "../components";
import { EditState } from "../../services/vo/edit";
import { ServiceClient } from "../../services/edit";
import { getClient } from "../../transport";
import { LocalFieldsState } from "../../reducers/localFields";
import { EditorTranslations } from "./EditorTranslations";
import { EditorWord } from "./EditorWord";
import { EditorSave } from "./EditorSave";
import { EditorDeclinations } from "./EditorDeclinations";
import { EditorGender } from "./EditorGender";

const EditorNounInternal = (
  props: EditState & {
    localFields: LocalFieldsState;
    setPluralWord: (pluralWord: boolean) => void;
    setGenitive: (genitiv: string) => void;
    deleteTranslation: (translation: string) => void;
  }
) => {
  return (
    <div>
      <EditorWord placeholder="noun" />
      <Input
        placeholder="genitive"
        value={props.Word.Noun.Genitive}
        onChange={e => props.setGenitive(e.target.value)}
      />
      <EditorDeclinations
        declinations={[
          { label: "a", value: GoConst.DeclinationA },
          { label: "e", value: GoConst.DeclinationE },
          { label: "o", value: GoConst.DeclinationO },
          { label: "u", value: GoConst.DeclinationU },
          { label: "o-neuter", value: GoConst.DeclinationONeuter },
          { label: "kons", value: GoConst.DeclinationKons },
          { label: "third", value: GoConst.DeclinationThird },
          { label: "third-neuter", value: GoConst.DeclinationThirdNeuter }
        ]}
      />
      <EditorGender/>
      <RadioBar
        onChangeSelection={s => {
          props.setPluralWord(s);
        }}
        options={[
          { label: "plural word", value: true },
          { label: "normal word", value: false }
        ]}
        selection={props.Word.Noun.PluralWord}
      />
      <EditorTranslations />
      <EditorSave />
    </div>
  );
};

const client = getClient(ServiceClient);

export const EditorNoun = connect(
  (state: State) => ({ ...state.edit, localFields: state.localFields }),
  dispatch => {
    const des = (newState: EditState) => {
      dispatch(actionEditSet(newState));
    };
    return {
      setPluralWord: async (pluralWord: boolean) => {
        //des( await client.set(pluralWord))
        // dispatch(actionEditNounSetPuralWord(pluralWord));
      },
      setGenitive: async (genitive: string) => {
        des(await client.setGenitive(genitive));
      }
    };
  }
)(EditorNounInternal);
