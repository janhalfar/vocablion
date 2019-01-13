import React from "react";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  background-color: #efefef;
  font-family: Helvetica, Arial, sans-serif;
}
a {
  text-decoration: none;
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

export const Title = styled.h2`
  color: darkgray;
  font-size: 3rem;
`;

const Logo = styled.h1`
  color: darkgray;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1rem;
`;

export const Button = styled.button`
  display: block;
  font-size: 2rem;
  border: none;
  border-radius: 0.3rem;
  padding: 1rem;
  color: white;
  background-color: grey;
`;

export const ButtonSmall = styled.button`
  display: block;
  font-size: .5rem;
  border: none;
  border-radius: 0.1rem;
  padding: .3rem;
  margin: .1rem;
  color: white;
  background-color: ${ props => {
    if(props.danger !== undefined) {
      return "red";
    }
    return "grey";
  }};
  display: inline;
`;

export const Input = styled.input`
  font-size: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid grey;
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
  children: React.ReactChildren | React.ReactElement<HTMLElement>;
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
