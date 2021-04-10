import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

export function FormButton({title, modeValue, sm, ...rest}) {
  return (
    <Button
      mode={modeValue}
      style={[
        styles.button,
        sm ? styles.buttonContainerSmall : styles.buttonContainerMedium,
      ]}
      contentStyle={styles.buttonContainer}
      {...rest}>
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  buttonContainerSmall: {
    width: width / 2,
    height: height / 10,
  },
  buttonContainerMedium: {
    width: width / 2,
    height: height / 15,
  },
});
