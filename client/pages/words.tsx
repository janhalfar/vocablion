import React from "react";
import { Page, Title, Input, ButtonSmall } from "../components/components";
import { getClient } from "../transport";
import { ServiceClient } from "../services/words";
import { ServiceClient as ServiceClientEdit } from "../services/edit";
import { WordsState } from "../services/vo/words";
import { State } from "../store";
import { connect } from "react-redux";
import { actionWordsSet, actionEditSet } from "../actions";
import styled from "styled-components";
import { Word } from "../services/vo/services";
import Router from "next/router";

const client = getClient(ServiceClient);
const editClient = getClient(ServiceClientEdit);

const Table = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  width: 100%;
`;

const Row = styled.tr`
  border: 1px solid black;
`;
const Cell = styled.td`
  padding: 0.5rem;
  border: 1px solid black;
`;

const wordType = (word: Word) => {
  switch (true) {
    case word.Noun !== undefined:
      return "noun";
    case word.Verb !== undefined:
      return "verb";
    case word.Adjective !== undefined:
      return "adj";
    default:
      return "unknown";
  }
};

const info = (word: Word) => {
  switch (true) {
    case word.Noun !== undefined:
      return word.Noun.Declination;
    case word.Verb !== undefined:
      return word.Verb.Conjugation;
    case word.Adjective !== undefined:
      return "adj";
    default:
      return "unknown";
  }
};

export interface WordsProps extends WordsState {
  search: (query: string) => void;
  deleteWord: (query:string, id:string) => void;
}

class InternalWords extends React.Component<WordsProps> {
  static async getInitialProps(ctx) {
    ctx.reduxStore.dispatch(actionWordsSet(await client.search("")));
    return {};
  }

  render() {
    const props = this.props;
    return (
      <Page>
        <Title>Words</Title>
        <Input
          onChange={e => props.search(e.target.value)}
          value={props.Query}
        />
        <p>bla bla</p>

        <Table>
          <thead>
            <Row>
              <Cell>Word</Cell>
              <Cell>Unit</Cell>
              <Cell>Type</Cell>
              <Cell>Info</Cell>
              <Cell>Translations</Cell>
              <Cell>Actions</Cell>
            </Row>
          </thead>
          <tbody>
            {props.Words.map(word => (
              <Row key={word.ID}>
                <Cell>{word.Word}</Cell>
                <Cell>{word.Unit}</Cell>
                <Cell>{wordType(word)}</Cell>
                <Cell>{info(word)}</Cell>
                <Cell>{word.Translations.join(", ")}</Cell>
                <Cell>
                  <ButtonSmall
                    onClick={e => {
                      Router.push({
                        pathname: "/edit",
                        query: { wordID: word.ID }
                      });
                    }}
                  >
                    edit
                  </ButtonSmall>
                  <ButtonSmall
                    danger
                    onClick={e => {
                      if(confirm("really detele: " + word.Word)) {
                        // console.log("deleting", props.Query, word.ID);
                        props.deleteWord(props.Query, word.ID);
                      }
                    }}
                  >
                    delete
                  </ButtonSmall>
                </Cell>
              </Row>
            ))}
          </tbody>
        </Table>
      </Page>
    );
  }
}



const Words = connect(
  (state: State) => state.words,
  dispatch => {
    const des = (newState: WordsState) => {
      dispatch(actionWordsSet(newState));
    };
    return {
      search: async (query: string) => {
        des(await client.search(query));
      },
      deleteWord: async (query:string, id:string) => {
        dispatch(actionEditSet(await editClient.deleteWord(id)));
        des(await client.search(query));
      }
    };
  }
)(InternalWords);

export default Words;
