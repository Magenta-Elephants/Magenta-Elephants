import React, { Component } from 'react';
import {StyleSheet, TextInput, Button, View} from 'react-native';

class QuestionInput extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render () {
    return (
      <TextInput
        style={styles.container}
        onChangeText={this.props.handleInput}
        placeholder={'Ask a question'}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20
  }
});

export default QuestionInput;