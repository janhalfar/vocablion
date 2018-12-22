import React from "react";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    background-color: #efefef;
}
`;

const P = styled.div`
  padding: 1rem;
  margin: 0;
`;

export const Title = styled.h2`
  color: darkgray;
  font-family: Helvetica, Arial, sans-serif;
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
`;

export const Input = styled.input`
  font-size: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid grey;
  padding: .8rem;
  margin: .5rem 0;
`;


export const List = styled.ul`
  list-style: none;
  margin-left: 0;
  padding-left: 0;
`;

export const ListItem = styled.ul`
    list-style: none;
  margin-left: 0;
padding-left: 0;
`;

export const Page = (props: { children: React.ReactChildren | React.ReactElement<HTMLElement> }) => (
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
