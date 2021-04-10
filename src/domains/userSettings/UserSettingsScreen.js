import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import {background} from '../../components/colors';

export default function UserSettingsScreen() {
  return (
    <View style={styles.container}>
      <Title>User settings</Title>
      <Title>All user settings will be here</Title>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
