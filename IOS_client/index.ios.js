import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import { StackNavigator } from 'react-navigation';

import App from './components/App.js'
import Chat from './components/Chat.js'

const forumApp = StackNavigator({
  Home: { screen: App },
  Chat: { screen: Chat },
});

AppRegistry.registerComponent('AwesomeProject', () => forumApp);