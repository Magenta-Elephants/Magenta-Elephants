import React from 'react';
import $ from 'jquery';
import Message from './Message.jsx';
import GiveRating from './GiveRating.jsx';

class AnswerQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: '',
    }
    this.changeProp = this.changeProp.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  changeProp(key, value) {
    this.setState({
      [key]: value
    });
  }

  sendMessage(e) {
    e.preventDefault();
    this.setState({ newMessage: '' });
    this.props.sendMessage(this.state.newMessage);
  }

  render() {
    return (
      <div className="giveAnswer">
        {
          this.props.messages.map((message, index) => 
            <Message message={message} key={index} />
          )
        }
        <form onSubmit={this.sendMessage} style={{"display": this.props.submitAnswerDisplay }}>
          <input type="text" onChange={ e => this.changeProp('newMessage', e.target.value) } />
          <button type="submit">Submit</button>
        </form>
        <button style={{"display": this.props.submitAnswerDisplay }} onClick={this.props.finishQuestion} >Finish Question</button>
        <GiveRating 
          questionId={this.props.questionId}
          changeProp={this.props.changeProp}
          userId={this.userId} 
          role={this.props.role} 
          ratingVisible={this.props.ratingVisible} 
        />
      </div>
    )
  }
}

export default AnswerQuestion;