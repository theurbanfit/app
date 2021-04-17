import React, {createContext, useState, useContext, useEffect} from 'react';
import {AuthContext} from '../auth/AuthProvider';
import {queryActiveUser} from '../../sharedServices';

export const ProfileContext = createContext({
  schedule: {},
});

export const useProfile = () => {
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

  return {profile: data};
};

export const ProfileProvider = ({children}) => {
  const {profile} = useProfile();

  return (
    <ProfileContext.Provider
      value={{
        profile,
      }}>
      {children}
    </ProfileContext.Provider>
  );
};
