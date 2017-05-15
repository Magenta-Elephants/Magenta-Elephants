import React from 'react';
import QuestionsList from './QuestionsList.jsx';

const RecentQuestions = props => (
  <section className="recentQuestions">
    <h1 className="headline">RECENT QUESTIONS</h1>
    <input className= "searchBar" placeholder="search" value={props.searchVal} onChange={props.changeSearch} />
    <QuestionsList 
      userId={props.userId}
      answerQuestion={props.answerQuestion}
      questions={props.questions} 
      changeIndexProp={props.changeIndexProp} 
    />
  </section>
);


export default RecentQuestions;