import {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../auth/AuthProvider';
import {retrieveScheduledClasses} from '../../../sharedServices';

export const scheduleStatuses = {
  pending: 'pending',
  notScheduled: 'notScheduled',
  scheduled: 'scheduled',
};

export const useScheduleStatus = scheduledClassId => {
  const {user} = useContext(AuthContext);
  const [snap, setSnap] = useState(undefined);
  const [scheduledClassStatus, setScheduledClassStatus] = useState(
    scheduleStatuses.pending,
  );

  useEffect(() => {
    const fetchData = async () => {
      const scheduledClasses = await retrieveScheduledClasses(user.uid);

      setSnap(
        Object.keys(scheduledClasses).some(key => key === scheduledClassId),
      );
    };
    fetchData();
  }, [user.uid, scheduledClassId]);

  useEffect(() => {
    if (snap === undefined) {
      setScheduledClassStatus(scheduleStatuses.pending);
    } else if (snap === false) {
      setScheduledClassStatus(scheduleStatuses.notScheduled);
    } else {
      setScheduledClassStatus(scheduleStatuses.scheduled);
    }
  }, [snap]);

  return [scheduledClassStatus, setScheduledClassStatus];
};
