import React from 'react';
import AskedQuestion from './AskedQuestion.jsx';
import AnswerQuestion from './AnswerQuestion.jsx';

const Answer = props => (
  <section className={"answer " + props.answerDisplayClass} >
    <AskedQuestion />
    <hr />
    <AnswerQuestion />
  </section>
);

export default Answer;