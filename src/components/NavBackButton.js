import * as React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const NavBackButton = () => {
  const navigation = useNavigation();
  const {colors} = useStyles();

  return (
    <IconButton
      color={colors.secondary}
      icon="keyboard-backspace"
      size={30}
      onPress={navigation.goBack}
    />
  );
};

const useStyles = () => {
  const {colors} = useTheme();

  return {
    colors,
    styles: StyleSheet.create({}),
  };
};
