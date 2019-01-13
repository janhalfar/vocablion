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

const active = (selection: string | string[], val:string) => {
  switch(true) {
    case selection === null: return false;
    case selection === undefined: return false;
    case typeof selection == "object": return selection.indexOf(val) > -1;
    case typeof selection == "string": return selection == val;
    default: false;
  }
  // typeof props.selection == "string" ? o.value === props.selection : props.selection.indexOf(o.value)>-1
}

export const RadioBar = (props: {
  bgColor: string;
  options: Option[];
  selection: string | string[];
  onChangeSelection: (newSelection: any) => void;
}) => (
  <Bar>
    {props.options.map(o => (
      <RadioButton
        bgColor={props.bgColor ? props.bgColor : "gray"}
        key={"value-"+o.value}
        onClick={e => {
          e.preventDefault();
          if(typeof props.selection == "string") {
            props.onChangeSelection(o.value);
          } else {
            let selection = props.selection.map(e => e);
            if(props.selection.indexOf(o.value) > -1) {
              selection = selection.filter(e => e !== o.value)
            } else {
              selection.push(o.value);
            }
            props.onChangeSelection(selection);
          }
        }}
        active={ active(props.selection, o.value)}
      >
        {o.label}
      </RadioButton>
    ))}
  </Bar>
);
