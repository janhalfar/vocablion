import React from "react";
import {
  BarChart,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Bar
} from "recharts";

import {Event} from '../../services/vo/status';

import moment from "moment";

export const EventsChart = (props: {
  events: Event[];
  since: number;
  buckets: number;
}) => {
  if (typeof window !== "object") {
    return <React.Fragment></React.Fragment>;
  }
  const since = moment.unix(props.since).fromNow();
  const events = props.events.filter(e => e.Timestamp >= props.since);
  if (events.length < 1) {
    return <React.Fragment><h2>{since} - nothing</h2></React.Fragment>;
  }

  const end = Math.trunc(Date.now()/1000);
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
    let name = moment.unix(props.since+(i*bucketSize)).fromNow();
    if (i == 0) {
      name = moment.unix(props.since).fromNow();
    } else if (i == props.buckets - 1) {
      name = "";
    }
    data.push({
      name,
      right: 0,
      wrong: 0,
      create: 0,
      update: 0,
      learn:0,
      deleteWord: 0,
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
        entry.deleteWord --;
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
  return (
    <React.Fragment>
      <h2>{since}</h2>
    <BarChart
      width={window.innerWidth*0.9}
      height={300}
      data={data}
      stackOffset="sign"
      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="right" fill="#0f0" stackId="stack" />
      <Bar dataKey="wrong" fill="#f00" stackId="stack" />
      <Bar dataKey="create" fill="#8884d8" stackId="stack" />
      <Bar dataKey="update" fill="#82ca9d" stackId="stack" />
      <Bar dataKey="deleteWord" fill="#0ff" stackId="stack" />
      <Bar dataKey="learn" fill="#000" stackId="stack" />
    </BarChart>
    </React.Fragment>
  );
};
