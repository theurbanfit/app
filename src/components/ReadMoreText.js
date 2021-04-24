import React, {useState} from 'react';
import {Text, useTheme} from 'react-native-paper';
import {StyleSheet, TouchableOpacity} from 'react-native';

export const ReadMoreText = ({numberOfLines = 4, styles = {}, children}) => {
  const ownStyles = useStyles();
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

const useStyles = () => {
  const {colors} = useTheme();

  return StyleSheet.create({
    button: {
      marginTop: 12,
      marginBottom: 12,
    },
    text: {
      color: colors.mintGreenSecondary700,
      fontSize: 14,
    },
  });
};
