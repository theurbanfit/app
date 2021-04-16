import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

export const UserSchedule = () => {
  return (
    <View>
      <Text>hello dear schedule</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    margin: 12,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
