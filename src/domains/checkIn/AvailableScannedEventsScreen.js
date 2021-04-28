import React, {memo} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {ActivityCard} from '../../components/ActivityCard';
import {ContainerView} from '../../components/ContainerView';
import {ScrollView} from 'react-native-gesture-handler';

export default memo(function AvailableScannedEventsScreen({
  navigation,
  route: {
    params: {availableScannedEventsForTheRestOfTheDay},
  },
}) {
  const handleSuccessfulCheckIn = remainingSeats => {
    if (remainingSeats > 0) {
      return Alert.alert(
        'Success',
        'You are ready to go!',
        [
          {
            text: 'Okay',
            onPress: () => navigation.navigate('Profile'),
          },
        ],
        {
          cancelable: false,
        },
      );
    }
    return Alert.alert(
      'Sorry :(',
      'All the seats are taken',
      [{text: 'Okay'}],
      {
        cancelable: false,
      },
    );
  };
  return (
    <SafeAreaView style={styles.flexOne}>
      <ScrollView>
        <ContainerView>
          {availableScannedEventsForTheRestOfTheDay &&
            availableScannedEventsForTheRestOfTheDay.map(
              ({
                classPhotoUrl,
                className,
                classTags,
                eventTimeRange,
                scheduledClassId,
                remainingSeats,
                prearrangedSeats,
              }) => (
                <ActivityCard
                  onPress={() => handleSuccessfulCheckIn(remainingSeats)}
                  remainingSeats={remainingSeats}
                  prearrangedSeats={prearrangedSeats}
                  key={scheduledClassId}
                  imageSrc={classPhotoUrl}
                  title={className}
                  timeRange={eventTimeRange}
                  tags={classTags}
                />
              ),
            )}
        </ContainerView>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  flexOne: {flex: 1},
});
