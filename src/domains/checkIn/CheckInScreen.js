import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, Text} from 'react-native-paper';

export default function CheckInScreen() {
  return (
    <View style={styles.container}>
      <Title>Urbanfit{'\u00A9'}</Title>
      <Text>This part of the app is still in progress</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
