import {useState, useEffect, useContext} from 'react';
import {ProfileContext} from '../../profile/ProfileProvider';

export const scheduleStatuses = {
  pending: 'pending',
  notScheduled: 'notScheduled',
  scheduled: 'scheduled',
};

export const useScheduleStatus = scheduledClassId => {
  const {
    profile: {schedule},
  } = useContext(ProfileContext);

  const [scheduledClassStatus, setScheduledClassStatus] = useState(
    scheduleStatuses.pending,
  );

  useEffect(() => {
    const classExistsInUserSchedule = (id, scheduledClasses) =>
      Object.keys(scheduledClasses).some(key => key === id);

    const classExists = classExistsInUserSchedule(scheduledClassId, schedule);
    if (classExists === undefined) {
      setScheduledClassStatus(scheduleStatuses.pending);
    } else if (classExists === false) {
      setScheduledClassStatus(scheduleStatuses.notScheduled);
    } else {
      setScheduledClassStatus(scheduleStatuses.scheduled);
    }
  }, [schedule, scheduledClassId]);

  return {scheduledClassStatus};
};
