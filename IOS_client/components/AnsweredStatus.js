import React from 'react';
import { Text } from 'react-native';

const AnsweredStatus = (props) => {
  if (props.answeredStatus) {
    return (
      <Text>✅</Text>
    )
  } else {
    return (
      <Text>✍</Text>
    )
  }
}

export default AnsweredStatus;