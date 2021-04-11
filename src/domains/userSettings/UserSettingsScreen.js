import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {background} from '../../components/colors';
export default function UserSettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Avatar.Image size={200} source={require('../../assets/begin.jpeg')} />
      <Button
        style={styles.uploadPhotoButton}
        icon="camera"
        mode="text"
        onPress={() => console.log('Pressed')}>
        Upload photo
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    flex: 1,
    alignItems: 'center',
  },
  uploadPhotoButton: {
    marginTop: 12,
  },
});
