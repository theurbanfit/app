import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../auth/AuthProvider';
import firestore from '@react-native-firebase/firestore';

export const useFetchUser = () => {
  const {user} = useContext(AuthContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();

      const data = response.data();
      setData(data);
    };

    fetchData();
  }, [user.uid, data]);

  return {user, userData: data};
};
