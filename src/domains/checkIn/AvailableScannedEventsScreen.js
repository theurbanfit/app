import React, {useState, memo} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {ActivityCard} from '../../components/ActivityCard';
import {ContainerView} from '../../components/ContainerView';
import {ScrollView} from 'react-native-gesture-handler';
import {formatActivityDateForFirestore} from '../../components/utils/datetime';

export default memo(function ActivitiesScreen({
  navigation,
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
              }) => (
                <ActivityCard
                  onPress={() => {
                    Alert.alert('Success', 'You have checked in');
                  }}
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
