import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../auth/AuthProvider';
import {retrieveActiveUser} from '../../../sharedServices';

export const useFetchUser = () => {
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
