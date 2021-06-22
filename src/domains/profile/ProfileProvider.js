import React, {createContext, useState, useContext, useEffect} from 'react';
import {AuthContext} from '../auth/AuthProvider';
import {queryActiveUser} from '../../sharedServices';

export const ProfileContext = createContext({});

export const useProfile = () => {
  const {auth} = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [isProfileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      const unsubscribe = queryActiveUser(auth.uid).onSnapshot(snapshot => {
        setProfile(snapshot.data());
        setProfileLoading(false);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  return {profile, isProfileLoading};
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
