import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Divider, Text} from 'react-native-paper';

export const UserSchedule = ({scheduledClasses}) => {
  return (
    <View>
      {scheduledClasses ? (
        Object.values(scheduledClasses).map(
          ({title, dateTime, scheduledClassId}) => (
            <View key={scheduledClassId}>
              <Text>{title}</Text>
              <Text>{dateTime}</Text>

              <Button
                uppercase={false}
                onPress={() => {
                  alert('removed');
                }}>
                Remove
              </Button>
              <Button
                uppercase={false}
                onPress={() => {
                  alert('view');
                }}>
                View class
              </Button>
              <Divider />
            </View>
          ),
        )
      ) : (
        <Text>Loading..</Text>
      )}
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
