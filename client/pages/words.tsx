import React from "react";
import { Page, Title, Input, ButtonSmall, wordInfo, wordType } from "../components/components";
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
  border-collapse: collapse;
  width: 100%;
`;

const Thead = styled.thead`
  font-weight: bold;
  color: white;
  background-color: grey;
`;

const Row = styled.tr`
  border: 1px solid black;
  :nth-child(even) {
    background-color: white;
  }
`;
const Cell = styled.td`
  padding: 0.5rem;
  border: 1px solid lightgray;
`;

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
          placeholder="filter words"
        />
        <Table>
          <Thead>
            <Row>
              <Cell>Word</Cell>
              <Cell>Unit</Cell>
              <Cell>Info</Cell>
              <Cell>Translations</Cell>
              <Cell>Actions</Cell>
            </Row>
          </Thead>
          <tbody>
            {props.Words.map(word => (
              <Row key={word.ID}>
                <Cell>{word.Word}</Cell>
                <Cell>{word.Unit}</Cell>
                <Cell>{wordType(word)} - {wordInfo(word)}</Cell>
                <Cell>{word.Translations.join(", ")}</Cell>
                <Cell>
                  <ButtonSmall
                    onClick={_e => {
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
