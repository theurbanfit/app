import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';

export default function UserInfo({displayName}) {
  return (
    <View style={styles.container}>
      <Title>{displayName}</Title>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  uploadPhotoButton: {
    marginTop: 12,
  },
});
