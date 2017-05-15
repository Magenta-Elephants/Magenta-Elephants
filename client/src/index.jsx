import React from 'react';
import { render } from 'react-dom';
import Nav from './components/Nav.jsx';
import SplitLayout from './components/SplitLayout.jsx';
import Answer from './components/Answer.jsx';
import $ from 'jquery';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
require('!style-loader!css-loader!sass-loader!./sass/all.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personalInfo: {},
      userInfo: {},
      currentQuestion: {}
    }
    this.changeUserCurrency = this.changeUserCurrency.bind(this);
    this.changeProp = this.changeProp.bind(this);
    this.getProfileInfo = this.getProfileInfo.bind(this);

    // legacy people: I'd recommend fixing this terrible regexing
    this.username = document.cookie.replace(/.*forumLogin=/, '');

    this.userId = document.cookie.replace(/.*forumId=/, '');
    this.userId = this.userId.match(/.+?;/)[0];
    this.userId = this.userId.substring(0, this.userId.length - 1);
  }

  componentWillMount() {
    this.getProfileInfo('personal');
  }

  changeProp(key, val) {
    this.setState({
      [key]: val
    });
  }

  changeUserCurrency(change) {
    var newObj = this.state.personalInfo;
    newObj.currentCurrency -= change;
    this.setState({
      personalInfo: newObj
    });
  }

  getProfileInfo(type) { 
    $.get('/users/' + this.username, (req, res) => {})
      .then(results => {
        this.setState({
          [type + "Info"]: JSON.parse(results)
        });
      })
      .catch(err => {
        console.log('error in retrieving profile info', err);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <main>
          <Nav currentCurrency={this.state.personalInfo.currentCurrency} />
          <Switch>
            <Route path="/Answer" render={innerProps => (
              <Answer 
                username={this.state.username} 
                userId={this.state.userId}
                question={this.state.currentQuestion} 
                changeIndexProp={this.changeProp}
                changeUserCurrency={this.changeUserCurrency}
              />
            )} />
            <Route render={innerProps => (
              <SplitLayout
                userId={this.userId}
                currentQuestion={this.state.currentQuestion}
                personalInfo={this.state.personalInfo}
                changeUserCurrency={this.changeUserCurrency}
                changeIndexProp={this.changeProp}
                username={this.username}
                redirect={this.state.redirect}
              />
            )} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

render(<App/>, document.getElementById('app'));









