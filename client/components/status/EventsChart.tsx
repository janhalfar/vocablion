import React from "react";
import { BarChart, CartesianGrid, Tooltip, ReferenceLine, Bar } from "recharts";

import { Event } from "../../services/vo/status";

import moment from "moment";
import { BadgeColors, Badge } from "./Badge";
import styled from "styled-components";

const Rechart = (since: string, data: any[]) => (
  <React.Fragment>
    <h2>{since}</h2>
    <BarChart
      width={window.innerWidth * 0.9}
      height={300}
      data={data}
      stackOffset="sign"
      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      style={{ backgroundColor: "white" }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="right" fill={BadgeColors.right} stackId="stack" />
      <Bar dataKey="wrong" fill={BadgeColors.wrong} stackId="stack" />
      <Bar dataKey="create" fill={BadgeColors.create} stackId="stack" />
      <Bar dataKey="update" fill={BadgeColors.update} stackId="stack" />
      <Bar dataKey="deleteWord" fill={BadgeColors.delete} stackId="stack" />
      <Bar dataKey="learn" fill={BadgeColors.learn} stackId="stack" />
    </BarChart>
  </React.Fragment>
);

export const EventsChart = (props: {
  events: Event[];
  since: number;
  buckets: number;
}) => {
  if (typeof window !== "object") {
    return <React.Fragment />;
  }
  const since = moment.unix(props.since).fromNow();
  const events = props.events.filter(e => e.Timestamp >= props.since);
  if (events.length < 1) {
    return (
      <React.Fragment>
        <h2>{since} - nothing</h2>
      </React.Fragment>
    );
  }

  const end = Math.trunc(Date.now() / 1000);
  const start = props.since;

  const bucketSize = (end - start) / props.buckets;
  interface Entry {
    name: string;
    right: number;
    wrong: number;
    create: number;
    learn: number;
    update: number;
    deleteWord: number;
  }
  let data: Entry[] = [];
  for (let i = 0; i < props.buckets; i++) {
    let name = i + " "  + moment.unix(props.since + i * bucketSize).fromNow();
    if (i == 0) {
      name = moment.unix(props.since).fromNow();
    }
    //  else if (i == props.buckets - 1) {
    //   name = "";
    // }
    data.push({
      name,
      right: 0,
      wrong: 0,
      create: 0,
      update: 0,
      learn: 0,
      deleteWord: 0
    });
  }
  events.forEach(e => {
    const relativeTimestamp = e.Timestamp - start;
    const bucketI = Math.trunc(
      (relativeTimestamp - (relativeTimestamp % bucketSize)) / bucketSize
    );
    if (data[bucketI] === undefined) {
      console.log("no bucket for", bucketI);
      return;
    }
    const entry = data[bucketI];
    switch (true) {
      case e.DeleteWord !== undefined:
        entry.deleteWord--;
        break;
      case e.LearnWord !== undefined:
        entry.learn++;
        break;
      case e.CreateWord !== undefined:
        entry.create++;
        break;
      case e.UpdateWord !== undefined:
        entry.update++;
        break;
      case e.Feedback !== undefined:
        if (e.Feedback && e.Feedback.Success) {
          entry.right++;
        } else {
          entry.wrong--;
        }
        break;
    }
  });
  let min = 0;
  let max = 0;
  data.forEach(d => {
    const localMin = -1 * (d.deleteWord + d.wrong);
    if (localMin > min) {
      min = localMin;
    }
    const localMax = d.create + d.learn + d.update + d.right;
    if (localMax > max) {
      max = localMax;
    }
  });

  const p = 100 / Math.max(min,max);
  const Row = styled.div`
    border-collapse: collapse;
    width: 100%;
  `;
  const Fifty = styled.div`
    width: 50%;
    border-top: 1px solid #efefef;
    border-collapse: collapse;
    display: inline-block;
  `;
  const Left = styled(Fifty)`
    text-align: right;
  `;
  const Right = styled(Fifty)`
    border-left: 1px solid #efefef;
    text-align: left;
  `;
  const B = styled.div`
    border-collapse : collapse;
    width: ${props => Math.abs(p * props.size)}%;
    background: ${props => props.color};
    height: 100%;
    display:inline-block;
    text-overflow: hidden;
  `;

  const Block = props => <B size={props.size} color={props.color}>&nbsp;</B>

  const Label = (props: { children: Element }) => (
    <div style={{ position: "relative" }}>
      <div
        style={{ position: "absolute", fontSize: ".8rem", color: "lightgray" }}
      >
        {props.children}
      </div>
    </div>
  );
  const Graph = styled.div`
    background: white;
  `;
  return (
    <React.Fragment>
      <h2>{since} {min} {max}</h2>
      <Graph>
        {data.reverse().map((d, i) => (
          <Row key={"d-" + i} title={JSON.stringify(d)}>
            <Left>
              <Label>{d.name}</Label>
              <Block size={d.deleteWord} color={BadgeColors.delete}/>
              <Block size={d.wrong} color={BadgeColors.wrong}/>
            </Left>
            <Right>
              <Block size={d.create} color={BadgeColors.create}/>
              <Block size={d.update} color={BadgeColors.update}/>
              <Block size={d.learn} color={BadgeColors.learn}/>
              <Block size={d.right} color={BadgeColors.right}/>
            </Right>
          </Row>
        ))}
      </Graph>
    </React.Fragment>
  );
};
