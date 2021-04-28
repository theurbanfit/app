import {useState, useEffect} from 'react';
import {
  retrieveScheduleFromFacilityId,
  sortBasedOnStartTime,
} from '../_services';
import {
  convertTimeStringToMoment,
  convertTimeToDateTimeString,
  deriveTimeRange,
} from '../../../components/utils/datetime';
import moment from 'moment';
import {retrieveClass} from '../../activities/_services';

const fetchEventInformation = async events => {
  if (!events) {
    return;
  }

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
            classDurationInMinutes,
            classPhotoUrl,
            classTags,
            className,
          } = await retrieveClass(classId);

          return {
            facilityId,
            classId,
            className,
            classPhotoUrl,
            classTags,
            eventDateTime: convertTimeToDateTimeString(startTime),
            eventTimeRange: deriveTimeRange(startTime, classDurationInMinutes),
            scheduledClassId,
            remainingSeats,
            prearrangedSeats,
          };
        },
      ),
  );
};

// returns all the available events a facility has for the choose date
export const useAvailableEventsFromScannedFacility = facilityId => {
  const [
    availableScannedEventsForTheRestOfTheDay,
    setAvailableEvents,
  ] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const schedule = await retrieveScheduleFromFacilityId(facilityId);

      const eventsForRestOfTheDay = schedule?.filter(({startTime}) => {
        const eventDateTime = convertTimeStringToMoment(startTime);
        return eventDateTime.isAfter(moment());
      });

      const sortedEvents = await fetchEventInformation(eventsForRestOfTheDay);

      setAvailableEvents(sortedEvents);
    };

    fetchData();
  }, [facilityId]);

  return {availableScannedEventsForTheRestOfTheDay};
};
