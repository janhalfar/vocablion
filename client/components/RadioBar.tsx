import React from "react";
import styled from "styled-components";

export interface Option {
  label: string;
  value: any;
}

const Bar = styled.div`
`;

const RadioButton = styled.div`
  display: inline-block;
  padding: 0.3rem;
  margin:.3rem;
  :first-child {
    margin-left: 0;
  }
  background-color: ${props => props.active ? "#626de6" : props.bgColor };
  color: white;
  ${ props => props.active && "border: 1px solid blue;"}
  border-radius: 0.3rem;
  font-weight: normal;
`;

export const RadioBar = (props: {
  bgColor: string;
  options: Option[];
  selection: any;
  onChangeSelection: (newSelection: any) => void;
}) => (
  <Bar>
    {props.options.map(o => (
      <RadioButton
        bgColor={props.bgColor ? props.bgColor : "gray"}
        key={"value-"+o.value}
        onClick={e => {
          e.preventDefault();
          props.onChangeSelection(o.value);
        }}
        active={o.value === props.selection}
      >
        {o.label}
      </RadioButton>
    ))}
  </Bar>
);
