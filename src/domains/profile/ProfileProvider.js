import React, {createContext, useContext, useEffect, useState} from 'react';
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

  return {
    profile,
    // we want the profile to return the loading state only when the user is
    // logged in
    isProfileLoading: profile.uid ? isProfileLoading : false,
  };
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
