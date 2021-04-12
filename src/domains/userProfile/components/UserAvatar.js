import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import {ActivityIndicator, Portal, Modal, Text} from 'react-native-paper';

export default function UserAvatar({onUploadAvatar, source, loading}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onUploadAvatar}>
        <Portal>
          <Modal visible={loading} dismissable={false}>
            <Text>This might take a minute, please wait</Text>
            <ActivityIndicator animating={true} />
          </Modal>
        </Portal>
        <Avatar.Image
          style={styles.margins}
          size={100}
          source={source || require('../../../assets/begin.jpeg')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  margins: {
    margin: 12,
  },
});
