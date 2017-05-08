import React from 'react';
import QuestionsList from './QuestionsList.jsx';

const RecentQuestions = props => (
  <section className="recentQuestions">
    <h1 className="headline">Recent Questions</h1>
    <QuestionsList changeRight={props.changeRight} questions={props.questions} />
  </section>
);

export default RecentQuestions;