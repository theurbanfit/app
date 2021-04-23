import {useState, useEffect} from 'react';
import moment from 'moment';
import {
  convertTimeStringToMoment,
  deriveTimeRange,
} from '../../../components/utils/datetime';
import {
  retrieveClass,
  retrieveDistrict,
  retrieveFacilities,
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
          const {
            facilityAddress,
            facilityDescription,
            districtId,
          } = await retrieveFacility(facilityId);
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
          const {name} = await retrieveDistrict(districtId);

          return {
            facilityId,
            facilityAddress,
            facilityDescription,
            facilityDistrictName: name,

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
            districtId,
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
    setEvents([]);
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

export const useDistricts = () => {
  const [activeDistricts, setActiveDistricts] = useState(undefined);
  const [allowedDistricts, setAllowedDistrict] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const facilities = await retrieveFacilities();
      const districts = await Promise.all(
        facilities.map(async ({districtId}) => {
          return await retrieveDistrict(districtId);
        }),
      );
      setActiveDistricts(districts);
      setAllowedDistrict(districts.map(({districtId}) => districtId));
    };

    fetchData();
  }, []);

  return {activeDistricts, allowedDistricts, setAllowedDistrict};
};
