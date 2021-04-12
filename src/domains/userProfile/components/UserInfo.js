import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';

export default function UserInfo({displayName, styles = {}}) {
  return (
    <View style={[ownStyles.container, styles]}>
      <Title>{displayName}</Title>
    </View>
  );
}

const ownStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginLeft: 12,
  },
});
