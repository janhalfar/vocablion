import React from "react";
import { Page, Title } from "../components/components";
import { PracticeNext } from "../components/practice/Next";
import { State } from "../store";
import { connect } from "react-redux";
import { PracticeState } from "../reducers/practice";
import { actionPracticeSet } from "../actions";
import { getClient } from "../transport";
import { ServiceClient } from "../services/practice";
import { Feedback } from "../components/practice/Feedback";
import { Learn } from "../components/practice/Learn";
import { Practice } from "../components/practice/Practice";

interface PracticeProps extends PracticeState {
  answer: (translations: string[]) => void;
}

const practiceClient = getClient(ServiceClient);

class InternalPractice extends React.Component<PracticeProps> {
  static async getInitialProps(ctx) {
    let status = await practiceClient.next();
    ctx.reduxStore.dispatch(actionPracticeSet(status));
    return {};
  }
  private renderContent() {
    switch (true) {
      case this.props.LearnWord !== null:
        return (
          <React.Fragment>
            <Learn word={this.props.LearnWord!} />
            <PracticeNext/>
          </React.Fragment>
        );
      case this.props.Feedback !== null:
        return (
          <React.Fragment>
            <Feedback feedback={this.props.Feedback!} />
          </React.Fragment>
        );
      default:
        return <Practice/>;
    }
  }
  render() {
    return (
      <Page>
        <Title>Practice</Title>
        {this.renderContent()}
      </Page>
    );
  }
}

export default connect(
  (state: State) => state.practice,
  dispatch => {
    const des = (newState: PracticeState) => {
      dispatch(actionPracticeSet(newState));
    };
    return {
      answer: async (translations: string[]) => {
        des(await practiceClient.answer(translations));
      }
    };
  }
)(InternalPractice);
