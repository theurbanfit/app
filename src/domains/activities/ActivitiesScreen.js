import React, {useState, useEffect, memo} from 'react';
import {View, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {ActivityIndicator, Title, Text} from 'react-native-paper';
import {CalendarStrip} from '../../components/CalendarStrip';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {ActivityCard} from '../../components/ActivityCard';

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
    .flatMap(({classes, facilityId, fullAddress}) =>
      Object.values(classes).flatMap(({bannerUrl, name, schedule, tags}) => {
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
            tags,
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

export default memo(function ActivitiesScreen() {
  const today = moment();
  const [selectedDay, setSelectedDay] = useState(today);
  const {events} = useEventsForDay(selectedDay.day());

  return (
    <SafeAreaView>
      <CalendarStrip
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <View style={styles.container}>
        {events.length ? (
          events.map(
            ({
              fullAddress,
              bannerUrl,
              name,
              startTime,
              endTime,
              scheduledClassId,
              tags,
            }) => (
              <ActivityCard
                key={scheduledClassId}
                fullAddress={fullAddress}
                imageSrc={bannerUrl}
                title={name}
                startTime={startTime}
                endTime={endTime}
                tags={tags}
              />
            ),
          )
        ) : (
          <View style={styles.containerCentered}>
            <ActivityIndicator size="large" animating={true} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
});
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginRight: width * 0.02,
    marginLeft: width * 0.02,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
});
