import React from 'react';

const QuestionListItem = props => (
  <li onClick={props.changeRight} >
    <div>
      <img className="questionImage" src="https://placeholdit.imgix.net/~text?txtsize=9&txt=100%C3%97100&w=100&h=100" />
      <div>
        <h3 className="username">Oliver Ullman:</h3>
        <h3 className="questionTitle">The quick brown fox jumped over the lazy dog</h3>
        <button className="answerQuestion">Answer</button>
      </div>
    </div>
  </li>
);

export default QuestionListItem;