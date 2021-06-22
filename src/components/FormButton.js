import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Button, useTheme} from 'react-native-paper';

const {width} = Dimensions.get('screen');

export function FormButton({title, modeValue, sm, ...rest}) {
  const {
    theme: {colors},
    styles,
  } = useStyles();

  return (
    <Button
      mode={modeValue}
      style={[
        styles.button,
        sm ? styles.buttonContainerSmall : styles.buttonContainerMedium,
      ]}
      labelStyle={{color: colors.secondary, fontSize: 18}}
      theme={{
        colors: {
          label: colors.white,
        },
      }}
      contentStyle={styles.buttonContainer}
      {...rest}>
      {title}
    </Button>
  );
}

const useStyles = () => {
  const {colors} = useTheme();

  return {
    theme: {colors},
    styles: StyleSheet.create({
      button: {
        color: colors.secondary,
      },
      buttonContainerSmall: {
        width: width / 2,
        height: 'auto',
      },
      buttonContainerMedium: {
        minWidth: width / 2,
        height: 'auto',
      },
    }),
  };
};
