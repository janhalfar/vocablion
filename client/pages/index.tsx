import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Page, Title, List, ListItem } from "../components/components";

const Index = (props) => {
  return (
    <Page>
      <Title>Index</Title>
      <List>
        <ListItem>
          <Link href="/status">
            <a>Mein Status</a>
          </Link>
        </ListItem>
        <ListItem>
          <ul>
            <ListItem>
              <Link href="/practice">
                <a>Practice WS 1</a>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/practice">
                <a>Practice WS 2</a>
              </Link>
            </ListItem>
          </ul>
        </ListItem>
        <ListItem>
          <Link href="/word">
            <a>Word</a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/edit">
            <a>Edit</a>
          </Link>
        </ListItem>
      </List>
    </Page>
  );
};
/*
      <SolutionList>
        <SolutionItem>loben</SolutionItem>
      </SolutionList>
*/
export default Index;
