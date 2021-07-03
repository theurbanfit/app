import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, Text} from 'react-native-paper';

export default function UserInfo({displayName, styles = {}, total = 0}) {
  return (
    <View style={[ownStyles.container, styles]}>
      <Title>{displayName}</Title>
      <Text>Total check-ins: {total}</Text>
    </View>
  );
}

const ownStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginLeft: 12,
  },
});
