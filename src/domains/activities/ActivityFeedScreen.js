import React, {useState, useEffect, memo} from 'react';
import {SafeAreaView} from 'react-native';
import {CalendarStrip} from '../../components/CalendarStrip';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {ActivityCard} from '../../components/ActivityCard';
import {ContainerView} from '../../components/ContainerView';
import {
  convertTimeStringToMoment,
  deriveTimeRange,
} from '../../components/utils/time';

const mapNumberToWeekDays = {
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
  7: 'sun',
};

const deriveEventsForTheDateFromSnapshot = (date, snapshot = {docs: []}) => {
  const numberOfTheDay = date.day();

  return snapshot.docs
    .map(doc => doc.data())
    .flatMap(({classes, facilityId, facilityDescription, fullAddress}) =>
      Object.values(classes).flatMap(
        ({
          bannerUrl,
          name,
          schedule,
          tags,
          classId,
          durationInMinutes,
          classImportantInfo,
          classDescription,
          howToPrepare,
          howToArrive,
        }) => {
          const day = mapNumberToWeekDays[numberOfTheDay];
          const scheduleOfTheDay = schedule[day] ?? {};
          return Object.values(scheduleOfTheDay)
            .sort(({startTime: a}, {startTime: b}) =>
              moment(convertTimeStringToMoment(a)).diff(
                convertTimeStringToMoment(b),
              ),
            )
            .map(
              ({
                startTime,
                scheduledClassId,
                remainingSeats,
                prearrangedSeats,
              }) => ({
                dateTime: moment(date.format('YYYY MM DD') + ' ' + startTime),
                timeRange: deriveTimeRange(startTime, durationInMinutes),
                scheduledClassId,
                remainingSeats,
                prearrangedSeats,
                name,
                bannerUrl,
                fullAddress,
                facilityId,
                tags,
                classId,
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
};

const useEventsForDate = date => {
  const numberOfTheDay = date.day;
  const [snap, setSnap] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore().collection('facilities').get();
      setSnap(snapshot);
    };
    fetchData();
  }, [numberOfTheDay]);

  return {events: deriveEventsForTheDateFromSnapshot(date, snap)};
};

export default memo(function ActivitiesScreen({navigation}) {
  const today = moment();
  const [selectedDay, setSelectedDay] = useState(today);
  const {events} = useEventsForDate(selectedDay);

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
              dateTime,
              timeRange,
              scheduledClassId,
              tags,
              classId,
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
                    dateTime,
                    timeRange,
                    tags,
                    scheduledClassId,
                    classId,
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
