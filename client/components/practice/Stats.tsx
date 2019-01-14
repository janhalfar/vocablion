import moment from "moment";
import { StatsWord } from "../../services/vo/practice";
import styled from "styled-components";
import { Time } from "../../services/vo/time";

export interface StatsProps extends StatsWord {}

const S = styled.div`
  ul {
    margin: 0;
    padding:0;
    li {
      margin: 0;
      list-style: none;
    }
  }
`;

const Blocks = styled.div``;
const Block = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 1rem;
`;

const UBlock = (props: { label: string; times?: Time[] }) => (
  <Block>
    <h3>{props.label}</h3>
    <ul>
      {props.times && props.times.reverse().map((t,i) => <li key={i}>{moment(t).fromNow()}</li>)}
    </ul>
  </Block>
);

export const Stats = (props: StatsProps) => (
  <S>
    <h2>phase {props.Phase}</h2>
    <Blocks>
      <UBlock label="learned" times={props.LearnHistory} />
      <UBlock label="failed" times={props.FailHistory} />
      <UBlock label="succeeded" times={props.SuccessHistory} />
    </Blocks>
  </S>
);
