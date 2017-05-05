import React from 'react';
import $ from 'jquery';

class AnswerQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerBody: ''
    }
    this.updateQuestion = this.updateQuestion.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
  }

  updateQuestion(e) {
    e.preventDefault();
    var obj = {
     questionId: 5, 
     expertId: 1,
     answer: this.state.answerBody
    };

    $.ajax({
      type: 'PUT',
      url: '/questions',
      data: obj,
      success: (data) => {
        console.log('success!', data);
      },
      error: (err) => {
        console.log('error with updating question', err);
      }
    });
  }

  updateAnswer(e) {
    this.setState({
      answerBody: e.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.updateQuestion}>  
        <h1 className="headline">Your Answer Here</h1>
        <textarea value={this.answerBody} placeholder="Answer Question Here" onChange={this.updateAnswer} ></textarea>
        <button>Submit</button>
      </form>
    )
  }
}

export default AnswerQuestion;