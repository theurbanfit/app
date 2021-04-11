import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {background} from '../../components/colors';
import UploadPhoto from '../../components/UploadPhoto';
export default function UserProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <UploadPhoto />
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
