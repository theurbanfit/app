import * as React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

export const ContainerView = ({children, style}) => (
  <View style={[style, styles.container]}>{children}</View>
);

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginRight: width * 0.02,
    marginLeft: width * 0.02,
  },
});
