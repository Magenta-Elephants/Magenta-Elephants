import React from 'react';
import $ from 'jquery';

class AskedQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.htmlDecode = this.htmlDecode.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('the next stuff', nextProps, nextState);
    return true;
  }

  htmlDecode(value){
    var code = $('<div/>').html(value);
    return code[0].textContent;
  }

  render() {
    return (
      <section className="answer">
        <h1 className="headline">{this.props.question.questionTitle}</h1>
        <div className="askedQuestionDescription">
          <pre>
            {this.htmlDecode(this.props.question.questionBody)}
          </pre>
        </div> 
      </section>

    )
  }
};

export default AskedQuestion;