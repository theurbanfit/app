import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../auth/AuthProvider';
import {
  retrieveActiveUser,
  retrieveScheduledClasses,
} from '../../../sharedServices';

export const useUser = () => {
  const {user} = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await retrieveActiveUser(user.uid);

      setData(response.data());
    };

    fetchData();
  }, [user.uid, data]);

  return {user, userData: data};
};

export const useScheduledClasses = () => {
  const {user} = useContext(AuthContext);
  const [snap, setSnap] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const scheduledClasses = await retrieveScheduledClasses(user.uid);

      setSnap(scheduledClasses);
    };
    fetchData();
  }, [user.uid]);

  return {scheduledClasses: snap};
};
