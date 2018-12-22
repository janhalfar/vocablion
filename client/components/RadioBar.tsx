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
  background-color: ${props => props.active ? "#626de6" : "grey"};
  color: white;
`;

export const RadioBar = (props: {
  options: Option[];
  selection: any;
  onChangeSelection: (newSelection: any) => void;
}) => (
  <Bar>
    {props.options.map(o => (
      <RadioButton
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
