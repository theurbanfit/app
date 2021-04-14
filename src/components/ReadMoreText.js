import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {primary} from './colors';

export const ReadMoreText = ({numberOfLines = 4, styles = {}, children}) => {
  const [expanded, toggleExpansion] = useState(false);
  return (
    <>
      <Text numberOfLines={expanded ? 0 : numberOfLines} style={styles}>
        {children}
      </Text>
      <TouchableOpacity
        style={ownStyles.button}
        onPress={() => toggleExpansion(!expanded)}>
        <Text style={ownStyles.text}>
          {expanded ? '-' : '+'} Read {expanded ? 'less' : 'more'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const ownStyles = StyleSheet.create({
  button: {
    marginTop: 12,
    marginBottom: 12,
  },
  text: {
    color: primary,
    fontSize: 14,
  },
});
