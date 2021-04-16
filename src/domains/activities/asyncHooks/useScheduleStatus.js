import {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../auth/AuthProvider';
import {retrieveActiveUser} from '../../../sharedServices';

export const scheduleStatuses = {
  pending: 'pending',
  notScheduled: 'notScheduled',
  scheduled: 'scheduled',
};

export const useScheduleStatus = scheduledClassId => {
  const {user} = useContext(AuthContext);
  const [snap, setSnap] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await retrieveActiveUser(user.uid);

      const {schedule = {}} = snapshot.data();
      setSnap(Object.keys(schedule).some(key => key === scheduledClassId));
    };
    fetchData();
  }, [user.uid, scheduledClassId]);

  if (snap === undefined) {
    return [scheduleStatuses.pending, setSnap];
  } else if (snap === false) {
    return [scheduleStatuses.notScheduled, setSnap];
  } else {
    return [scheduleStatuses.scheduled, setSnap];
  }
};
