import React from 'react';
import RecentQuestions from './RecentQuestions.jsx';
import AskedQuestion from './AskedQuestion.jsx';
import { Switch, Route } from 'react-router-dom';
import Ask from './Ask.jsx';
import Answer from './Answer.jsx';
import $ from 'jquery';
import Dashboard from './Dashboard/Dashboard.jsx';

class SplitLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      recentlyAsked: [],
      searchVal: ''
    };
    this.answerQuestion = this.answerQuestion.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.searchTags = this.searchTags.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  componentWillMount() {
    this.getQuestions();
    this.getQuestionsInterval = setInterval(this.getQuestions, 25000);
  }

  addQuestion(question) {
    console.log(question, this.state.questions);
    var questions = this.state.questions;
    questions.unshift(question);
    this.setState({
      questions: questions
    });
  }

  getQuestions() {
    $.get('/questions', (req, res) => {})
      .then(results => {
        this.setState({ questions: results });
      })
      .catch(err => {
        console.log('there was an error with get ', err)
      });
  }

  searchTags() {
    this.setState({ recentlyAsked: this.state.questions });

    var query = '/questions/' + this.state.searchVal;
    console.log('the query', query);
    $.get(query, (req, res) => {})
      .then(results => {
        this.setState({ questions: JSON.parse(results) });
      })
      .catch(err => {
        console.log('there was an error with searchtags', err);
      })
  }

  changeSearch(e) {
    clearTimeout(this.getQuestionsInterval);
    if (this.searchCountdown) {
      clearTimeout(this.searchCountdown);
    } 
    this.searchCountdown = setTimeout(() => this.searchTags(), 1500);

    this.setState({
      searchVal: e.target.value
    });
  }

  answerQuestion(index) {
    clearInterval(this.getQuestionsInterval);
    var questions = this.state.questions;
    questions[index].Eid_User = this.props.userId;
    this.setState({ questions: questions });
    this.props.changeIndexProp('currentQuestion', questions[index]);
    var obj = {
      Eid_User: this.props.personalInfo.id,
      questionId: this.state.questions[index].id
    };
    $.ajax({
      type: 'PUT',
      url: '/questions',
      data: obj,
      err: (err) => {
        console.log('error!');
      }
    });
  }

  render() {
    return (
      <div className="main">
        <RecentQuestions 
          answerQuestion={this.answerQuestion}
          changeSearch={this.changeSearch}
          questions={this.state.questions}
        />
        <Switch>
          <Route exact path="/Ask" render={innerProps => (
            <Ask 
              changeUserCurrency={this.props.changeUserCurrency}
              changeIndexProp={this.props.changeIndexProp}
              addQuestion={this.addQuestion}
              personalInfo={this.props.personalInfo}
              username={this.props.username}
              questions={this.state.questions}
              redirect={this.props.redirect}
            />
          )} />
          <Route exact path="/Dashboard" render={innerProps => (
            <Dashboard 
              userInfo={this.props.personalInfo}
              changeIndexProp={this.props.changeIndexProp}
            /> 
          )} />
          <Route exact path="/Asked/Recent" render={innerProps => (
            <AskedQuestion question={this.props.currentQuestion} />
          )} />
          <Route path="/Asked/:number" render={innerProps => (
            <AskedQuestion question={this.state.questions[innerProps.match.params.number]} />
          )} />
        </Switch>
      </div>
    )
  }
};


export default SplitLayout;