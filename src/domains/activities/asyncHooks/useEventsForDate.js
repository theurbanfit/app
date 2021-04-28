import {useState, useEffect} from 'react';
import {
  convertTimeStringToMoment,
  deriveTimeRange,
  mapNumberToWeekDays,
} from '../../../components/utils/datetime';
import {
  retrieveClass,
  retrieveDistrict,
  retrieveFacilities,
  retrieveScheduleForDayOfTheWeek,
} from '../_services';
import {retrieveFacility} from '../../../sharedServices';
import {sortBasedOnStartTime} from '../../checkIn/_services';

const fetchEventInformation = async (events = [], selectedDate) => {
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

            eventDateTime: convertTimeStringToMoment(startTime, selectedDate),
            eventTimeRange: deriveTimeRange(startTime, classDurationInMinutes),
            scheduledClassId,
            remainingSeats,
            prearrangedSeats,
            districtId,
          };
        },
      ),
  );
};

export const useEventsForDate = selectedDate => {
  const numberOfTheDay = selectedDate.day();
  const dayOfTheWeek = mapNumberToWeekDays[numberOfTheDay];

  const [events, setEvents] = useState(undefined);
  useEffect(() => {
    setEvents([]);
    const fetchData = async () => {
      const unsortedEvents = await retrieveScheduleForDayOfTheWeek(
        dayOfTheWeek,
      );
      const sortedEvents = await fetchEventInformation(
        unsortedEvents,
        selectedDate,
      );

      setEvents(sortedEvents);
    };

    fetchData();
  }, [dayOfTheWeek, selectedDate]);

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
