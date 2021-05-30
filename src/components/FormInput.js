import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

export function FormInput({labelName, ...rest}) {
  const {
    styles,
    theme: {colors},
  } = useStyles();

  return (
    <TextInput
      label={labelName}
      style={styles.input}
      numberOfLines={1}
      selectionColor={colors.secondary}
      outlineColor={colors.secondary}
      underlineColor={colors.secondary}
      theme={{
        colors: {
          text: colors.secondary,
          primary: colors.secondary,
          placeholder: colors.secondary,
          background: colors.primaryLight200,
        },
      }}
      {...rest}
    />
  );
}

const useStyles = () => {
  const {colors} = useTheme();

  return {
    theme: {colors},
    styles: StyleSheet.create({
      input: {
        marginTop: 10,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15,
      },
    }),
  };
};
