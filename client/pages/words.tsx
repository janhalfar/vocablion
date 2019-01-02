import React from "react";
import { Page, Title, Input } from "../components/components";
import { getClient } from "../transport";
import { ServiceClient } from "../services/words";
import { WordsState } from "../services/vo/words";
import { State } from "../store";
import { connect } from "react-redux";
import { actionWordsSet } from "../actions";

const InternalWords = (props: WordsState & {search:(query) => void}) => {
  return (
      <Page>
        <Title>Words</Title>
        <Input onChange={e => props.search(e.target.value)} value={props.Query}></Input>
        <p>bla bla</p>
      </Page>
  );
};
const client = getClient(ServiceClient)
export default connect(
  (state: State) => state.words,
  dispatch => {
    const des = (newState: WordsState) => {
      dispatch(actionWordsSet(newState));
    };
    return {
      search: async (query: string) => {
        des(await client.search(query));
      }
    };
  }
)(InternalWords);

