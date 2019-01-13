import React from "react";

import styled from "styled-components";

import { Feedback as PracticeFeedback } from "../../services/vo/practice";

export const Feedback = (props: { feedback: PracticeFeedback }) => {
  const feedback = props.feedback;
  const sol = feedback.Solution;
  return (
    <React.Fragment>
      <h2>{feedback.Success ? "yes baby you did it" : "oh noes"}</h2>
      <div>
        {feedback.Correct.length > 0 ? (
          <div>
            that was right
            <ul>
              {feedback.Correct.map(w => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        ) : (
          "nothing right"
        )}
        {feedback.Wrong.length > 0 && (
          <div>
            that was wrong
            <ul>
              {feedback.Wrong.map(w => (
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
                    Noun {sol.Noun.Genitive ? "gen: " + sol.Noun.Genitive : ""}{" "}
                    {sol.Noun.Declination}{" "}
                    {sol.Noun.PluralWord && "plural word"}
                  </div>
                )}
              </div>
              <div>{sol.Verb && <div>Verb {sol.Verb.Praeteritum}</div>}</div>
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
    </React.Fragment>
  );
};
