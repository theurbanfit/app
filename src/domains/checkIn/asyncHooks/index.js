import {useState, useEffect} from 'react';
import {
  retrieveScheduleFromFacilityId,
  sortBasedOnStartTime,
} from '../_services';
import {
  convertTimeStringToMoment,
  convertTimeToDateTimeString,
  deriveTime,
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
      .filter(({startTime}) => {
        const eventTime = deriveTime(convertTimeStringToMoment(startTime));
        const now = deriveTime(moment());
        return eventTime.isAfter(now);
      })
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

      const sortedEvents = await fetchEventInformation(schedule);

      setAvailableEvents(sortedEvents);
    };

    fetchData();
  }, [facilityId]);

  return {availableScannedEventsForTheRestOfTheDay};
};
