import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, useTheme} from 'react-native-paper';
import {ActivityIndicator, Portal, Modal, Text} from 'react-native-paper';

export default function UserAvatar({onUploadAvatar, source, loading}) {
  const styles = useStyles();
  return (
    <TouchableOpacity onPress={onUploadAvatar}>
      <Portal>
        <Modal
          visible={loading}
          dismissable={false}
          contentContainerStyle={styles.container}>
          <Text>This might take a minute, please wait.</Text>
          <ActivityIndicator animating={true} style={styles.loadingIndicator} />
        </Modal>
      </Portal>
      <Avatar.Image
        style={styles.margins}
        size={100}
        source={source ? {uri: source} : undefined}
      />
    </TouchableOpacity>
  );
}

const useStyles = () => {
  const {colors} = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: 'white',
      margin: 40,
      padding: 20,
      textAlign: 'center',
    },
    loadingIndicator: {marginTop: 20},
    margins: {
      backgroundColor: colors.mintGreen,
      margin: 12,
    },
  });
};
