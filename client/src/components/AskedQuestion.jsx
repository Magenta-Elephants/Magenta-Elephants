import React from 'react';
import Message from './Message.jsx';

class AskedQuestion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="askedQuestion">
        <h1 className="headline">{this.props.question.questionTitle}</h1>
        <p className="askedQuestionDescription">{this.props.question.questionBody}</p> 
        <div>
          {
            this.props.question.Messages.map((message, index) => 
              <Message message={message} key={index} />
            )
          }
        </div>
      </section>
    )
  }
};

export default AskedQuestion;