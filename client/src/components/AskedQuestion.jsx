import React from 'react';
import $ from 'jquery';
import Message from './Message.jsx';

class AskedQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.htmlDecode = this.htmlDecode.bind(this);
  }

  htmlDecode(value) {
    var code = $('<div/>').html(value);
    return code[0].textContent;
  }

  render() {
    console.log(this.props.question);
    return (
      <section className="askedQuestion">
        <h1 className="headline">{this.props.question.questionTitle}</h1>
        <div className="askedQuestionDescription">
          <pre className="codeDisplay">
            {this.htmlDecode(this.props.question.questionBody)}
          </pre>
        </div> 
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