import React, { Component } from 'react';
import axios from 'axios';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
// import SocketIOClient from 'socket.io-client';

export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    this.onSend = this.onSend.bind(this);

    // Socket connection
    // this.socket = SocketIOClient('http://localhost:3000');
  }

  componentWillMount() {
    var questionData = this.props.navigation.state.params.question;
    var originalQuestion = parseData(
      questionData.Nid_User,
      questionData.questionTitle,
      undefined,
      questionData.Eid_User,
      questionData.username,
      questionData.avatar
    );

    var inputMessages = [originalQuestion];
    questionData.Messages.forEach(function(message, index, array) {
      var currentMessage = parseData(message.id, message.msg, message.date, message.userId, message.userId, undefined);
      return inputMessages.unshift(currentMessage);
    });

    this.setState({messages: inputMessages});
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

  }

  // sendMessage(value) {
  //   this.socket.emit('new message', {msg: value, user: this.props.username});
  //   var newMessage = {
  //     userId: this.props.userId,
  //     body: value,
  //     questionId: this.props.question.id
  //   };
  //   $.ajax({
  //     type: 'POST',
  //     url: '/messages',
  //     data: newMessage,
  //     success: (data) => {
  //       console.log('success!', data);
  //     },
  //     error: (err) => {
  //       console.log('error with sending message', err);
  //     }
  //   });
  // }

  // componentWillUnmount() {
  //   this.socket.disconnect();
  // }

  // recieveMessage(data) {
  //   var question = this.props.question;
  //   question.Messages.push({ user: data.user, msg: data.msg });
  //   this.props.changeIndexProp('currentQuestion', question);
  // }

  // componentDidMount() {
  //   this.socket = io('/' + this.props.question.id);
  //   this.socket.emit('new user', this.props.username, () => {});
  //   this.socket.on('new message', (e) => {
  //     console.log('message recieved');
  //     this.recieveMessage(e);
  //   });
  //   this.socket.on('finish', (e) => {
  //     this.setState({ 
  //       ratingVisible: true,
  //       submitAnswerDisplay: 'none'
  //     });
  //   });
  // }   
    

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 100,
        }}
      />
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

function parseData(messageID, message, createdAt, userID, userName, userAvatar) {
  if (createdAt === undefined) {
    createdAt = new Date();
  }
  if (userAvatar === undefined) {
    userAvatar = 'https://facebook.github.io/react/img/logo_og.png';
  }
  return {
    _id: messageID,
    text: message,
    createdAt: createdAt,
    user: {
      _id: userID,
      name: userName,
      avatar: userAvatar
    }
  };
}