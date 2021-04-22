import {useState, useEffect} from 'react';
import moment from 'moment';
import {
  convertTimeStringToMoment,
  deriveTimeRange,
} from '../../../components/utils/datetime';
import {
  retrieveClass,
  retrieveFacility,
  retrieveScheduleForDayOfTheWeek,
} from '../services';

const mapNumberToWeekDays = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
};
const sortBasedOnStartTime = ({startTime: a}, {startTime: b}) =>
  moment(convertTimeStringToMoment(a)).diff(convertTimeStringToMoment(b));

const fetchEventInformation = async (events = [], date) => {
  return Promise.all(
    events
      .sort(sortBasedOnStartTime)
      .map(
        async ({
          scheduledClassId,
          classId,
          facilityId,
          startTime,
          prearrangedSeats,
          remainingSeats,
        }) => {
          const {facilityAddress, facilityDescription} = await retrieveFacility(
            facilityId,
          );
          const {
            classDurationInMinutes,
            classPhotoUrl,
            classTags,
            classPreparationInfo,
            classDescription,
            classImportantInfo,
            classArrivalInfo,
            className,
          } = await retrieveClass(classId);

          return {
            facilityId,
            facilityAddress,
            facilityDescription,

            classId,
            className,
            classPhotoUrl,
            classTags,
            classImportantInfo,
            classDescription,
            classPreparationInfo,
            classArrivalInfo,

            dateTime: moment(date.format('YYYY MM DD') + ' ' + startTime),
            timeRange: deriveTimeRange(startTime, classDurationInMinutes),
            scheduledClassId,
            remainingSeats,
            prearrangedSeats,
          };
        },
      ),
  );
};

export const useEventsForDate = date => {
  const numberOfTheDay = date.day();
  const dayOfTheWeek = mapNumberToWeekDays[numberOfTheDay];

  const [events, setEvents] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const unsortedEvents = await retrieveScheduleForDayOfTheWeek(
        dayOfTheWeek,
      );
      const sortedEvents = await fetchEventInformation(unsortedEvents, date);
      setEvents(sortedEvents);
    };

    fetchData();
  }, [dayOfTheWeek, date]);

  return {events};
};
