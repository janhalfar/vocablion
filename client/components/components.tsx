import React from "react";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  background-color: #efefef;
  font-family: Helvetica, Arial, sans-serif;
}
`;

const P = styled.div`
  padding: 1rem;
  margin: 0;
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
  display: block;
`;

export const List = styled.ul`
  list-style: none;
  margin-left: 0;
  padding-left: 0;
`;

export const ListItem = styled.li`
  font-size: 1rem;
  list-style: none;
  margin-left: 0;
  padding-left: 0;
`;

export const Page = (props: {
  children: React.ReactChildren | React.ReactElement<HTMLElement>;
}) => (
  <P>
    <GlobalStyle />
    <Logo>
      <Link href="/">
        <div>vocablion</div>
      </Link>
    </Logo>
    {props.children}
  </P>
);
