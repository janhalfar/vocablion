import React from "react";
import Link from "next/link";
import { Page, Title, List, ListItem } from "../components/components";

const Index = () => {
  return (
    <Page>
      <Title>Index</Title>
      <List>
        <ListItem>
          <Link href="/status">
            <a>Status</a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/practice">
            <a>Practice</a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/words">
            <a>Words</a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/edit">
            <a>Add</a>
          </Link>
        </ListItem>
      </List>
    </Page>
  );
};
export default Index;
