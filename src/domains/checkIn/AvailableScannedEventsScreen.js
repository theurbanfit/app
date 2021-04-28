import React, {memo} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {ActivityCard} from '../../components/ActivityCard';
import {ContainerView} from '../../components/ContainerView';
import {ScrollView} from 'react-native-gesture-handler';

export default memo(function AvailableScannedEventsScreen({
  route: {
    params: {availableScannedEventsForTheRestOfTheDay},
  },
}) {
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
                  onPress={() => {
                    Alert.alert('Success', 'You have checked in');
                  }}
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
