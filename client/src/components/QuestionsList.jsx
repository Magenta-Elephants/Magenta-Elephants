import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';

const QuestionsList = props => (
  <ul className="questionsList">
    <QuestionsListItem changeRight={props.changeRight} />
    <QuestionsListItem changeRight={props.changeRight} />
    <QuestionsListItem changeRight={props.changeRight} />
    <QuestionsListItem changeRight={props.changeRight} />
    <QuestionsListItem changeRight={props.changeRight} />
    <QuestionsListItem changeRight={props.changeRight} />
  </ul>
);

export default QuestionsList;