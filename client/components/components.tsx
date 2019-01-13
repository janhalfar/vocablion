import React from "react";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";
import { Word } from "../services/vo/services";
import Router from "next/router";

const GlobalStyle = createGlobalStyle`
body {
  background-color: #c1c1c1;
  font-family: Helvetica, Arial, sans-serif;
}
a {
  text-decoration: none;
  color: #287fcc;
  :visited {
    color: #287fcc;
  }
}

h1, h2, h3 {
  color: #6e6e6e;
  font-weight: normal;
}

html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*, *:before, *:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
  }

`;

const P = styled.div`
  margin: 1rem;
`;

export const ShadowBox = styled.div`
  box-shadow: 2px 2px 14px 0px rgba(50, 50, 50, 0.45);
`;

export const ShadowButton = styled.button`
  box-shadow: 2px 2px 14px 0px rgba(50, 50, 50, 0.45);
  background-color: ${props => {
    if (props.danger !== undefined) {
      return "red";
    }
    return "#287fcc";
  }};
`;

export const Title = styled.h2`
  color: white;
  font-size: 3rem;
  font-weight: 900;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  /* color: darkgray; */
  font-family: Helvetica, Arial, sans-serif;
  /* font-size: 1rem; */
`;

export const Form = styled.div`
  width: 100%;
  max-width: 640px;
`;

export const gotoWord = (wordID: string) =>
  Router.push({
    pathname: "/edit",
    query: { wordID }
  });

export const Button = styled(ShadowButton)`
  cursor: pointer;
  display: block;
  font-size: 2rem;
  border: none;
  border-radius: 0.3rem;
  padding: 1rem;
  color: white;
  width: ${props => (props.width ? props.width : "auto")};
`;

export const Question = styled.h2`
  font-size: 3rem;
  color: black;
  font-weight: 900;
`;

export const ButtonBarVertical = styled.div`
  button {
    margin-top: 0.5rem;
  }
  margin: 0.5rem 0;
`;

export const ButtonSmall = styled(ShadowButton)`
  cursor: pointer;
  display: block;
  font-size: 1rem;
  border: none;
  border-radius: 0.1rem;
  padding: 0.3rem;
  margin: 0.1rem;
  color: white;
  display: inline;
`;

export const Input = styled.input`
  font-size: 1.5rem;
  border-radius: 0.5rem;
  /* border: 1px solid grey; */
  border: none;
  padding: 0.8rem;
  margin: 0.5rem 0;
  width: 100%;
`;

export const List = styled.ul`
  list-style: none;
  margin-left: 0;
  padding-left: 0;
`;

export const ListItem = styled.li`
  font-size: 2rem;
  list-style: none;
  margin-left: 0;
  padding: 0.2rem 0;
  text-decoration: none;
`;

export const Page = (props: {
  children:
    | React.ReactChildren
    | React.ReactElement<HTMLElement>
    | Element
    | Element[]
    | JSX.Element
    | JSX.Element[];
}) => (
  <P>
    <GlobalStyle />
    <Logo>
      <Link href="/">
        <a>vocablion</a>
      </Link>
    </Logo>
    {props.children}
  </P>
);

export const wordLongInfo = (word: Word) =>
  wordType(word) + " - " + wordInfo(word);

export const wordInfo = (word: Word) => {
  switch (true) {
    case word.Adverb !== undefined:
      return "n/a";
    case word.Phrase !== undefined:
      return word.Phrase && word.Phrase.Info ? word.Phrase.Info : "n/a";
    case word.Noun !== undefined:
      return word.Noun!.Declination;
    case word.Verb !== undefined:
      return word.Verb!.Conjugation;
    case word.Adjective !== undefined:
      return "adj";
    default:
      return "unknown";
  }
};

export const wordType = (word: Word) => {
  switch (true) {
    case word.Phrase !== undefined:
      return "phrase";
    case word.Adverb !== undefined:
      return "adverb";
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
