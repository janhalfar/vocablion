import React from "react";
import { Page, Title } from "../components/components";
import { State } from "../store";
import { ServiceClient } from "../services/status";
import { getClient } from "../transport";
import { actionStatusSet } from "../actions";
import { connect } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { StatusState, Stats } from "../services/vo/status";
import styled from "styled-components";
import moment from "moment";

export interface PracticeProps extends StatusState {
  status: () => void;
}

const statusClient = getClient(ServiceClient);

const hour = 3600;
const day = 3600 * 24;

enum BadgeRole {
  Great,
  Neutral,
  Poor
}

const StyledBadge = styled.div`
  color: white;
  padding: 0.5rem;
  margin: 0.3rem;
  border-radius: 0.5rem;
  display: inline-block;
  background-color: ${props =>
    ((role: BadgeRole) => {
      switch (role) {
        case BadgeRole.Poor:
          return "red";
        case BadgeRole.Great:
          return "green";
        default:
          return "grey";
      }
    })(props.role)};
`;

const StatsComp = (props: { stats: Stats }) => (
  <React.Fragment>
    <Badge role={BadgeRole.Great}>
      Practice right {props.stats.PracticeRight}
    </Badge>
    <Badge role={BadgeRole.Poor}>
      Practice wrong {props.stats.PracticeWrong}
    </Badge>
    <Badge>create word {props.stats.WordCreate}</Badge>
    <Badge>update word {props.stats.WordUpdate}</Badge>
  </React.Fragment>
);

const Badge = (props: { role?: BadgeRole; children: any }) => (
  <StyledBadge role={props.role}>{props.children}</StyledBadge>
);

class InternalPractice extends React.Component<PracticeProps> {
  static async getInitialProps(ctx) {
    let status = await statusClient.getStatus();
    ctx.reduxStore.dispatch(actionStatusSet(status));
    return {};
  }
  renderEvents(since: number, buckets: number = 100) {
    const now = Date.now();
    const events = this.props.Events.filter(e => e.Timestamp >= since);
    let start = now;
    if (events.length < 1) {
      return;
    } 
    let end = events[events.length - 1].Timestamp;
    // const buckets = 100;
    const bucketSize = (end - start) / buckets;
    interface Entry {
      name: string;
      right: number;
      wrong: number;
      create: number;
      update: number;
    }
    let data: Entry[] = [];
    for (let i = 0; i < buckets; i++) {
      let name = "";
      if (i == 0) {
        name = moment.unix(start).fromNow();
        console.log("start name", name);
      } else if (i == buckets - 1) {
        name = moment.unix(now/1000).fromNow();
      }
      data.push({
        name,
        right: 0,
        wrong: 0,
        create: 0,
        update: 0
      });
    }
    console.log(data);
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
            entry.wrong++;
          }
          break;
      }
    });

    return (
      <AreaChart
        ref={ref => console.log("ref ===================>", ref)}
        width={1000}
        height={400}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="create"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="update"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="right"
          stackId="1"
          stroke="#0f0"
          fill="#0f0"
        />
        <Area
          type="monotone"
          dataKey="wrong"
          stackId="1"
          stroke="#f00"
          fill="#f00"
        />
      </AreaChart>
    );
  }
  render() {
    const nowTimestamp = Date.now() / 1000;
    return (
      <Page>
        <Title>Status</Title>
        <h2>all time</h2>
        <StatsComp stats={this.props.Stats} />
        <h2>last hour</h2>
        {this.renderEvents(nowTimestamp - hour, 60)}
        <h2>24h</h2>
        {this.renderEvents(nowTimestamp - hour * 24, 24)}
        <h2>last seven days</h2>
        {this.renderEvents(nowTimestamp - day * 7, 7)}
      </Page>
    );
  }
}

export default connect(
  (state: State) => state.status,
  dispatch => {
    const des = (newState: StatusState) => {
      dispatch(actionStatusSet(newState));
    };
    return {
      status: async () => {
        des(await statusClient.status());
      }
    };
  }
)(InternalPractice);
