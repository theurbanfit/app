import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../auth/AuthProvider';
import {queryActiveUser} from '../../../sharedServices';

export const useUser = () => {
  const {auth} = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = queryActiveUser(auth.uid).onSnapshot(snapshot => {
      setData(snapshot.data());
    });
    return () => {
      unsubscribe();
    };
  }, [auth.uid]);

  return {userData: data};
};
