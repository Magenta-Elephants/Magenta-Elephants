import React from 'react';
import { View, Image, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Currency from './Currency.js';
import AnsweredStatus from './AnsweredStatus.js';

class Question extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      answered: false
    }
  }

  render() {
    console.log('props inside the question       ', this.props.q);

    const { navigate } = this.props.navigation;
    if (this.props.q.avatar) {
      return (
        <TouchableHighlight onPress={() => navigate('Chat', {question: this.props.q})}>
          <View style={styles.questionBox}>
            <Image 
              source={{uri: this.props.q.avatar}} 
              style={styles.image}/>
            <Text style={styles.textArea}>{this.props.q.questionTitle}</Text>
            <Currency />
            <AnsweredStatus style={styles.answeredStatusBox} answeredStatus={this.state.answered} />
          </View>
        </TouchableHighlight>
      )
    } else {
      return (
        <View>
          <Text>{this.props.q.questionTitle}</Text>
          <Currency />
          <AnsweredStatus answeredStatus={this.state.answered} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  questionBox: {
    width: 350,
    height: 120,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: '#C0C0C0',
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  image: {
    width: 80,
    height: 110
  },
  textArea: {
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    flexWrap: 'wrap'
  },
  answeredStatusBox: {
    flex: 1,
    flexDirection: 'row',
    bottom: 0
  }
});

export default Question;