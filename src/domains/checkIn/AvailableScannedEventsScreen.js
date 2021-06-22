import React, {memo, useContext} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {ActivityCard} from '../../components/ActivityCard';
import {ContainerView} from '../../components/ContainerView';
import {ScrollView} from 'react-native-gesture-handler';
import {
  decreaseRemainingSeatsOfScheduledClass,
  increaseCheckInNumberOfUser,
} from './_services';
import {AuthContext} from '../auth/AuthProvider';

export default memo(function AvailableScannedEventsScreen({
  navigation,
  route: {
    params: {availableScannedEventsForTheRestOfTheDay},
  },
}) {
  const {auth} = useContext(AuthContext);
  const handleSuccessfulCheckIn = (remainingSeats, scheduledClassId) => {
    if (remainingSeats > 0) {
      return Alert.alert(
        'You have checked in!',
        'You are ready to go, get ready for your class!',
        [
          {
            text: 'Okay',
            onPress: async () => {
              await decreaseRemainingSeatsOfScheduledClass(scheduledClassId);
              await increaseCheckInNumberOfUser(auth.uid);
              navigation.navigate('Profile');
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    }
    return Alert.alert(
      'Sorry :(',
      'Sorry, all the seats are taken. You can try another class',
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
                  onPress={() =>
                    handleSuccessfulCheckIn(remainingSeats, scheduledClassId)
                  }
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
