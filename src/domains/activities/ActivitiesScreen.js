import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';

export default function ActivitiesScreen() {
  return (
    <View style={styles.container}>
      <Title>Urbanfit{'\u00A9'}</Title>
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
