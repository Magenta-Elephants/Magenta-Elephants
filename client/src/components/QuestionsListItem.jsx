import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class QuestionListItem extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.question.id;
    this.state = {
      redirect: false
    };
    this.answerQuestion = this.answerQuestion.bind(this);
  }

  answerQuestion() {
    if (this.props.answerQuestion(this.props.index)) {
      this.setState({
        redirect: true
      });
    }
  }

  render() {
    var iconClass = (this.props.question.answered) ? 'fa fa-check' : 'fa fa-times';
    var buttonDisplay = (this.props.question.answered) ? {display: 'none'} : {display: 
      'inline-block'};
    var buttonText = (this.props.question.Eid_User == this.props.userId) ? 'Finish' : 'Answer';

    if (this.state.redirect) {
      return <Redirect push to="/Answer" />
    }

    return (
      <Link to={"/Asked/" + this.props.index}>
        <li className="recentQuestion" id={this.props.question.id}>
          <div>
            <img className="questionImage" src={this.props.question.avatar} />
            <div>
              <h3 className="username">{this.props.question.username}:</h3>
              <h3 className="questionTitle">{this.props.question.questionTitle}</h3>
              <button className="answerQuestion" style={buttonDisplay} onClick={this.answerQuestion} >{buttonText}</button>
              <i className={iconClass}></i>
            </div>
          </div>
        </li>
      </Link>  
    )
  }
}

export default QuestionListItem;