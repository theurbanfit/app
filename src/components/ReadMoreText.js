import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';

export const ReadMoreText = ({numberOfLines = 4, styles = {}, children}) => {
  const [expanded, toggleExpansion] = useState(false);
  return (
    <>
      <Text numberOfLines={expanded ? 0 : numberOfLines} style={styles}>
        {children}
      </Text>

      <Button onPress={() => toggleExpansion(!expanded)}>
        {expanded ? '-' : '+'} Read {expanded ? 'less' : 'more'}
      </Button>
    </>
  );
};
