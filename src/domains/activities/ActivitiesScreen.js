import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Title} from 'react-native-paper';
import {CalendarStrip} from '../../components/CalendarStrip';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

const mapNumberToWeekDays = {
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
  7: 'sun',
};

const deriveEventsForTheDayFromSnapshot = (numberOfTheDay, snapshot) =>
  snapshot.docs
    .map(doc => doc.data())
    .map(({classes, facilityId, fullAddress}) =>
      Object.values(classes).map(({bannerUrl, name, schedule}) => {
        const day = mapNumberToWeekDays[numberOfTheDay];

        return Object.values(schedule[day]).map(
          ({
            startTime,
            endTime,
            scheduledClassId,
            remainingSeats,
            prearrangedSeats,
          }) => ({
            startTime,
            endTime,
            scheduledClassId,
            remainingSeats,
            prearrangedSeats,
            name,
            bannerUrl,
            fullAddress,
            facilityId,
          }),
        );
      }),
    );

const useEventsForDay = numberOfTheDay => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore().collection('facilities').get();

      const events = deriveEventsForTheDayFromSnapshot(
        numberOfTheDay,
        snapshot,
      );
      setData(events);
    };

    fetchData();
  }, [data, setData, numberOfTheDay]);

  return {events: data};
};

export default function ActivitiesScreen() {
  const [selectedDay, setSelectedDay] = useState(moment());
  const {events} = useEventsForDay(selectedDay.day());

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <CalendarStrip
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        <Title>Urbanfit{'\u00A9'}</Title>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
