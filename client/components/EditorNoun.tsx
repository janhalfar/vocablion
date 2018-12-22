import React from "react";
import { connect } from "react-redux";
import { State } from "../store";
import { EditState, WordType } from "../reducers/edit";
import { RadioBar } from "../components/RadioBar";
import {
  actionEditSetType,
  actionEditNounSetDeclination,
  actionEditNounSetSex,
  actionEditNounSetPuralWord,
  actionEditNounSetWord,
  actionEditNounSetGenitive,
  actionEditNounTranslationSet,
  actionEditNounTranslationSubmit,
  actionEditNounTranslationDelete
} from "../actions";
import { GoConst } from "../services/vo/services";
import { Input, List, ListItem, Button } from "./components";

const EditorNounInternal = (
  props: EditState & {
    setDeclination: (declination: string) => void;
    setSex: (sex: string) => void;
    setPluralWord: (pluralWord: boolean) => void;
    setWord: (word: string) => void;
    setGenitive: (genitiv: string) => void;
    setTranslation: (translation: string) => void;
    submitTranslation: () => void;
    deleteTranslation: (translation: string) => void;
  }
) => {
  return (
    <div>
      <Input
        placeholder="noun"
        value={props.word.Noun.Word}
        onChange={e => props.setWord(e.target.value)}
      />
      <Input
        placeholder="genitive"
        value={props.word.Noun.Genitive}
        onChange={e => props.setGenitive(e.target.value)}
      />
      <RadioBar
        onChangeSelection={s => {
          props.setDeclination(s);
        }}
        options={[
          { label: "a", value: GoConst.DeclinationA },
          { label: "o", value: GoConst.DeclinationO },
          { label: "o-neuter", value: GoConst.DeclinationONeuter },
          { label: "Kons", value: GoConst.DeclinationKons },
          { label: "third", value: GoConst.DeclinationThird },
          { label: "third-neuter", value: GoConst.DeclinationThirdNeuter }
        ]}
        selection={props.word.Noun.Declination}
      />
      <RadioBar
        onChangeSelection={s => {
          props.setSex(s);
        }}
        options={[
          { label: "female", value: GoConst.SexFemale },
          { label: "male", value: GoConst.SexMale },
          { label: "neuter", value: GoConst.SexNeuter }
        ]}
        selection={props.word.Noun.Sex}
      />
      <RadioBar
        onChangeSelection={s => {
          props.setPluralWord(s);
        }}
        options={[{ label: "plural word", value: true }, { label: "normal word", value: false }]}
        selection={props.word.Noun.PluralWord}
      />
      <form
        onSubmit={e => {
          e.preventDefault();
          props.submitTranslation();
        }}
      >
        <Input
          placeholder="add a translation"
          onChange={e => props.setTranslation(e.target.value)}
          value={props.translation}
        />
      </form>
      <List>
        {props.word.Noun.Translations.map(t => (
          <ListItem>
            {t}{" "}
            <Button onClick={e => props.deleteTranslation(t)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export const EditorNoun = connect(
  (state: State) => state.edit,
  dispatch => ({
    setDeclination: (declination: string) => {
      dispatch(actionEditNounSetDeclination(declination));
    },
    setSex: (sex: string) => {
      dispatch(actionEditNounSetSex(sex));
    },
    setPluralWord: (pluralWord: boolean) => {
      dispatch(actionEditNounSetPuralWord(pluralWord));
    },
    setWord: (word: string) => {
      dispatch(actionEditNounSetWord(word));
    },
    setGenitive: (genitiv: string) => {
      dispatch(actionEditNounSetGenitive(genitiv));
    },
    setTranslation: (translation: string) => {
      dispatch(actionEditNounTranslationSet(translation));
    },
    submitTranslation: () => {
      dispatch(actionEditNounTranslationSubmit());
    },
    deleteTranslation: (translation: string) => {
      dispatch(actionEditNounTranslationDelete(translation));
    }
  })
)(EditorNounInternal);
