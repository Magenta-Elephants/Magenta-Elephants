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
    this.username = document.cookie.substring(document.cookie.indexOf("forumLogin=") + 11);
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
                username={this.state.personalInfo.username} 
                question={this.state.currentQuestion} 
                changeUserCurrency={this.changeUserCurrency}
              />
            )} />
            <Route render={innerProps => (
              <SplitLayout
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









