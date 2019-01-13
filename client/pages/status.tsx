import React from "react";
import { Page, Title } from "../components/components";
import { State } from "../store";
import { ServiceClient } from "../services/status";
import { getClient } from "../transport";
import { actionStatusSet } from "../actions";
import { connect } from "react-redux";

import { StatusState, Stats } from "../services/vo/status";
import styled from "styled-components";
import { EventsChart } from "../components/status/EventsChart";

export interface PracticeProps extends StatusState {
  status: () => void;
}

const statusClient = getClient(ServiceClient);

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


const hour = 3600;
const day = 3600 * 24;

class InternalPractice extends React.Component<PracticeProps> {
  static async getInitialProps(ctx) {
    let status = await statusClient.getStatus();
    ctx.reduxStore.dispatch(actionStatusSet(status));
    return {};
  }
  render() {
    const nowTimestamp = Date.now() / 1000;
    return (
      <Page>
        <Title>Status</Title>
        <h2>all time</h2>
        <StatsComp stats={this.props.Stats} />

        <EventsChart
          events={this.props.Events}
          since={nowTimestamp - hour}
          buckets={60}
        />

        <EventsChart
          events={this.props.Events}
          since={nowTimestamp - 2*hour}
          buckets={120}
        />

        <EventsChart
          events={this.props.Events}
          since={nowTimestamp - hour * 24}
          buckets={24}
        />

        <EventsChart
          events={this.props.Events}
          since={nowTimestamp - (day * 30)}
          buckets={30}
        />

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
