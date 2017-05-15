import React from 'react';
import AnswerQuestion from './AnswerQuestion.jsx';
import AskedQuestion from './AskedQuestion.jsx';
import $ from 'jquery';

class Answer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ratingVisible: false,
      submitAnswerDisplay: 'block'
    };
    this.recieveMessage = this.recieveMessage.bind(this);
    this.finishQuestion = this.finishQuestion.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.changeProp = this.changeProp.bind(this);
    this.role = (this.props.question.EId_User == this.userId) ? 'expert' : 'novice';
  }

  componentWillMount() {
    $.ajax({
      type: 'POST',
      url: '/messages/' + this.props.question.id,
      error: (err) => {
        console.log('error with submitting answer', err);
      }
    });
  }

  recieveMessage(data) {
    var question = this.props.question;
    question.Messages.push({ user: data.user, msg: data.msg });
    this.props.changeIndexProp('currentQuestion', question);
  }

  componentDidMount() {
    this.socket = io('/' + this.props.question.id);
    this.socket.emit('new user', this.props.username, () => {});
    this.socket.on('new message', (e) => {
      console.log('message recieved');
      this.recieveMessage(e);
    });
    this.socket.on('finish', (e) => {
      this.setState({ 
        ratingVisible: true,
        submitAnswerDisplay: 'none'
      });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  changeProp(key, value) {
    this.setState({
      [key]: value
    });
  }

  finishQuestion() {
    this.socket.emit('finish');
    this.props.changeUserCurrency(this.props.question.price);
  }

  sendMessage(value) {
    this.socket.emit('new message', {msg: value, user: this.props.username});
    var newMessage = {
      userId: this.props.username,
      body: value,
      questionId: this.props.question.id
    };
    // $.ajax({
    //   type: 'POST',
    //   url: '/messages',
    //   data: newMessage,
    //   success: (data) => {
    //     console.log('success!', data);
    //   },
    //   error: (err) => {
    //     console.log('error with sending message', err);
    //   }
    // });
  }

  render() {
    return (
      <section className="main answer">
        <div className="question">
          <h1 className="headline">{this.props.question.questionTitle}</h1>
          <p className="askedQuestionDescription">{this.props.question.questionBody}</p> 
        </div>
        <AnswerQuestion 
          role={this.role}
          changeProp={this.changeProp}
          sendMessage={this.sendMessage} 
          messages={this.props.question.Messages} 
          finishQuestion={this.finishQuestion}
          questionId={this.props.question.id}
          userId={this.userId}
          ratingVisible={this.state.ratingVisible}
          submitAnswerDisplay={this.state.submitAnswerDisplay}
        /> 
      </section>
    )
  }
}

export default Answer;