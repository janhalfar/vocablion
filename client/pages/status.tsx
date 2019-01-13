import React from "react";
import { Page, Title } from "../components/components";
import { State } from "../store";
import { ServiceClient } from "../services/status";
import { getClient } from "../transport";
import { actionStatusSet } from "../actions";
import { connect } from "react-redux";

import { StatusState, Stats } from "../services/vo/status";

import { EventsChart } from "../components/status/EventsChart";
import { Badge, BadgeColors } from "../components/status/Badge";

export interface PracticeProps extends StatusState {
  status: () => void;
}

const statusClient = getClient(ServiceClient);

const StatsComp = (props: { stats: Stats }) => (
  <React.Fragment>
    <Badge color={BadgeColors.right}>
      right {props.stats.PracticeRight}
    </Badge>
    <Badge color={BadgeColors.wrong}>
      wrong {props.stats.PracticeWrong}
    </Badge>
    <Badge color={BadgeColors.learn }>learn {props.stats.PracticeLearn}</Badge>
    <Badge color={BadgeColors.create}>create {props.stats.WordCreate}</Badge>
    <Badge color={BadgeColors.update}>update {props.stats.WordUpdate}</Badge>
    <Badge color={BadgeColors.delete}>delete {props.stats.WordDelete}</Badge>
  </React.Fragment>
);



const sec = 1;
const minute = 60 * sec;
const hour = minute * 60;
const day = hour * 24;

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
          since={nowTimestamp - 15*minute}
          buckets={15}
        />

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
