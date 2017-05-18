import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Question from './Question.js';

class Stream extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={styles.container} >
        {this.props.questions.testData.map((question, index) => 
          <Question q={question} key={index} navigation={this.props.navigation}/>)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    backgroundColor: '#eeeeee',
    height: 300,
  },
  horizontalScrollView: {
    height: 106,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
  },
  button: {
    margin: 5,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#cccccc',
    borderRadius: 3,
  },
  thumb: {
    margin: 5,
    padding: 5,
    backgroundColor: '#cccccc',
    borderRadius: 3,
    minWidth: 96,
  },
  img: {
    width: 64,
    height: 64,
  }
});

export default Stream;