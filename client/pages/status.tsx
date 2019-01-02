import React from "react";
import { Page, Title } from "../components/components";

const Test = (props: {}) => {
  return (
    <Page>
      <Title>Status</Title>
      <h2>Meine Errungenschaften</h2>
      <ul>
        <li>20 stunden in dieser woche gelernt</li>
      </ul>
      <h2>Vokabeln pro Kasten</h2>
      <ul>
        <li>Kasten 1 999</li>
        <li>Kasten 2 1</li>
        <li>Kasten 3 0</li>
        <li>Kasten 4 0</li>
        <li>Kasten 5 0</li>
        <li>Kasten 6 0</li>
      </ul>
    </Page>
  );
};
export default Test;
