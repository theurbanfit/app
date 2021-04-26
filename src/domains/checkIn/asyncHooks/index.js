import {useState, useEffect} from 'react';
import {retrieveScheduleFromFacilityId} from '../_services';

export const useAvailableEventsFromScannedFacility = facilityId => {
  const [availableEventsFromScannedFacility, setAvailableEvents] = useState(
    undefined,
  );

  useEffect(() => {
    const fetchData = async () => {
      const facilities =
        facilityId && (await retrieveScheduleFromFacilityId(facilityId));
      console.log(facilities);
    };

    fetchData();
  }, [facilityId]);

  return {};
};
