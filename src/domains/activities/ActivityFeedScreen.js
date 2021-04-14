import React, {useState, useEffect, memo} from 'react';
import {SafeAreaView} from 'react-native';
import {CalendarStrip} from '../../components/CalendarStrip';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {ActivityCard} from '../../components/ActivityCard';
import {ContainerView} from '../../components/ContainerView';
import {deriveTimeRange} from '../../components/utils/time';

const mapNumberToWeekDays = {
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
  7: 'sun',
};

const deriveEventsForTheDayFromSnapshot = (
  numberOfTheDay,
  snapshot = {docs: []},
) =>
  snapshot.docs
    .map(doc => doc.data())
    .flatMap(({classes, facilityId, facilityDescription, fullAddress}) =>
      Object.values(classes).flatMap(
        ({
          bannerUrl,
          name,
          schedule,
          tags,
          durationInMinutes,
          classImportantInfo,
          classDescription,
          howToPrepare,
          howToArrive,
        }) => {
          const day = mapNumberToWeekDays[numberOfTheDay];
          const scheduleOfTheDay = schedule[day] ?? {};
          return Object.values(scheduleOfTheDay).map(
            ({
              startTime,
              scheduledClassId,
              remainingSeats,
              prearrangedSeats,
            }) => ({
              timeRange: deriveTimeRange(startTime, durationInMinutes),
              scheduledClassId,
              remainingSeats,
              prearrangedSeats,
              name,
              bannerUrl,
              fullAddress,
              facilityId,
              tags,
              classImportantInfo,
              classDescription,
              howToPrepare,
              howToArrive,
              facilityDescription,
            }),
          );
        },
      ),
    );

const useEventsForDay = numberOfTheDay => {
  const [snap, setSnap] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore().collection('facilities').get();
      setSnap(snapshot);
    };
    fetchData();
  }, [numberOfTheDay]);

  return {events: deriveEventsForTheDayFromSnapshot(numberOfTheDay, snap)};
};

export default memo(function ActivitiesScreen({navigation}) {
  const today = moment();
  const [selectedDay, setSelectedDay] = useState(today);
  const {events} = useEventsForDay(selectedDay.day());

  return (
    <SafeAreaView>
      <CalendarStrip
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <ContainerView>
        {events &&
          events.map(
            ({
              fullAddress,
              bannerUrl,
              name,
              timeRange,
              scheduledClassId,
              tags,
              classImportantInfo,
              classDescription,
              howToPrepare,
              howToArrive,
              facilityDescription,
            }) => (
              <ActivityCard
                onPress={() =>
                  navigation.navigate('ActivityDetails', {
                    imageSrc: bannerUrl,
                    title: name,
                    fullAddress,
                    timeRange,
                    tags,
                    scheduledClassId,
                    classImportantInfo,
                    classDescription,
                    howToPrepare,
                    howToArrive,
                    facilityDescription,
                    date: selectedDay,
                  })
                }
                key={scheduledClassId}
                fullAddress={fullAddress}
                imageSrc={bannerUrl}
                title={name}
                timeRange={timeRange}
                tags={tags}
              />
            ),
          )}
      </ContainerView>
    </SafeAreaView>
  );
});
