import React from "react";
import styled from "styled-components";
import { Button, Page, Title } from "../components/components";
import { PracticeNext } from "../components/practice/Next";
import { State } from "../store";
import { connect } from "react-redux";
import { PracticeState } from "../reducers/practice";
import { actionPracticeSet, actionWordsSet } from "../actions";
import { PracticeTranslations } from "../components/translations";
import { getClient } from "../transport";
import { ServiceClient } from "../services/practice";
import { Word } from "../services/vo/services";

const Question = styled.h2`
  font-size: 1.5rem;
`;

const ButtonOK = styled(Button)`
  background-color: #5bbf66;
`;

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

  render() {
    let sol: Word | undefined;
    const props = this.props;
    if (props.Feedback) {
      sol = props.Feedback.Solution;
    }
    return (
      <Page>
        <Title>Practice</Title>
        <Question>{props.Question}</Question>
        {props.Feedback ? (
          <div>
            <h2>
              {props.Feedback.Success ? "yes baby you did it" : "oh noes"}
            </h2>
            <div>
              {props.Feedback.Correct.length > 0 ? (
                <div>
                  that was right
                  <ul>
                    {props.Feedback.Correct.map(w => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                "nothing right"
              )}
              {props.Feedback.Wrong.length > 0 && (
                <div>
                  that was wrong
                  <ul>
                    {props.Feedback.Wrong.map(w => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                {sol && (
                  <div>
                    {sol.Word}
                    <div>
                      {sol.Noun && (
                        <div>
                          Noun{" "}
                          {sol.Noun.Genitive ? "gen: " + sol.Noun.Genitive : ""}{" "}
                          {sol.Noun.Declination}{" "}
                          {sol.Noun.PluralWord && "plural word"}
                        </div>
                      )}
                    </div>
                    <div>
                      {sol.Verb && <div>Verb {sol.Verb.Praeteritum}</div>}
                    </div>
                    <div>{sol.Adjective && <div>Adjective</div>}</div>
                    <ul>
                      {sol.Translations.map(t => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <PracticeTranslations />
            <ButtonOK onClick={_e => props.answer(props.translations)}>
              ok
            </ButtonOK>
          </div>
        )}
        <PracticeNext />
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
