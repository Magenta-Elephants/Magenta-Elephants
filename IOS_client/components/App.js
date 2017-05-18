import React, { Component } from 'react';
import axios from 'axios';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Stream from './Stream.js';
import testData from './TestData.js';
import QuestionInput from './QuestionInput.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionInput: ''
    }
    this.onButtonPress = this.onButtonPress.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillMount () {
    this.setState({
      questions: testData
    });
  }

  handleInput (text) {
    this.setState({
      questionInput: text
    });
  }

  onButtonPress () {
    console.log('The user asked for: ' + this.state.questionInput);

    var headers = {
      tags: 'ios',
      username: 'Preda',
      title: 'Question from IOS',
      body: this.state.questionInput,
      price: '10',
      minExpertRating: '10'
    }

    axios.post('http://localhost:3000/questions',  headers)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log('error: ', error)
    });
  }

  render() {
    return (
      <View style={styles.container} >
        <QuestionInput handleInput={this.handleInput}/>
        <Button
          onPress={this.onButtonPress}
          title="Post"
          color="#000066"
        />
        <Stream questions={this.state.questions} navigation={this.props.navigation}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});