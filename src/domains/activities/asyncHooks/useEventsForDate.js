import {useState, useEffect} from 'react';
import moment from 'moment';
import {
  convertTimeStringToMoment,
  deriveTimeRange,
} from '../../../components/utils/time';
import {retrieveFacilities} from '../services';

const mapNumberToWeekDays = {
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
  7: 'sun',
};

const sortBasedOnStartTime = ({startTime: a}, {startTime: b}) =>
  moment(convertTimeStringToMoment(a)).diff(convertTimeStringToMoment(b));

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
            .sort(sortBasedOnStartTime)
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

export const useEventsForDate = date => {
  const numberOfTheDay = date.day;
  const [snap, setSnap] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await retrieveFacilities();
      setSnap(snapshot);
    };
    fetchData();
  }, [numberOfTheDay]);

  return {events: deriveEventsForTheDateFromSnapshot(date, snap)};
};
