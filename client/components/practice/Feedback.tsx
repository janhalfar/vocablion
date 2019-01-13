import React from "react";

import styled from "styled-components";

import { Feedback as PracticeFeedback } from "../../services/vo/practice";
import { Learn } from "./Learn";
import { PracticeNext } from "./Next";

const Headline = styled.h2`
  font-size: 3rem;
  margin: 1rem 0;
`;

const Yess = styled(Headline)``;

const Crap = styled(Headline)``;

const FeedbackLine = styled.div`
  font-size: 2rem;
  margin: 1rem 0;
`;

const Right = styled(FeedbackLine)`
  color: black;
`;

const Wrong = styled(FeedbackLine)`
  text-decoration: underline wavy red;
`;

const BadNews = styled(FeedbackLine)`
  color: red;
`;

const GoodNews = styled(FeedbackLine)`
  color: darkgreen;
`;

const randomElement = (elements: string[]) =>
  elements[Math.floor(Math.random() * Math.floor(elements.length - 1))];

const noes = () =>
  randomElement(["😭", "🤪", "🤮", "🥺", "🧐", "🤢", "😫", "😤"]);
const yess = () =>
  randomElement(["😇", "❤️", "🥰", "😘", "😃", "✅", "🤠", "🙌"]);

export const Feedback = (props: { feedback: PracticeFeedback }) => {
  const feedback = props.feedback;
  const sol = feedback.Solution;
  return (
    <React.Fragment>
      {feedback.Success ? (
        <Yess>
          {yess()} {yess()} {yess()}
        </Yess>
      ) : (
        <Crap>
          {noes()} {noes()} {noes()}
        </Crap>
      )}
      {feedback.Correct.length > 0 ? (
        <React.Fragment>
          <GoodNews>Correct:</GoodNews>
          <Right>{feedback.Correct.join(", ")}</Right>
        </React.Fragment>
      ) : (
        feedback.Wrong.length === 0 && <h2>No Correct answers</h2>
      )}
      {feedback.Wrong.length > 0 && (
        <React.Fragment>
          <BadNews>Wrong:</BadNews>
          <Wrong>{feedback.Wrong.join(", ")}</Wrong>
        </React.Fragment>
      )}
      {sol && sol.Translations.length > feedback.Correct.length && (
        <BadNews>
          You missed {sol.Translations.length - feedback.Correct.length}{" "}
          translation(s)
        </BadNews>
      )}
      {sol && <Learn word={sol} />}
      <PracticeNext />
    </React.Fragment>
  );
};
