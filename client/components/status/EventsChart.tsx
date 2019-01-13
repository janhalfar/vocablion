import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Bar
} from "recharts";

import moment from "moment";

export const EventsChart = (props: {
  events: any[];
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
    update: number;
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
      update: 0
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
      width={window.innerWidth*0.8}
      height={300}
      data={data}
      stackOffset="sign"
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="right" fill="#0f0" stackId="practice" />
      <Bar dataKey="wrong" fill="#f00" stackId="practice" />
      <Bar dataKey="create" fill="#8884d8" stackId="edit" />
      <Bar dataKey="update" fill="#82ca9d" stackId="edit" />
    </BarChart>
    </React.Fragment>
  );
};
