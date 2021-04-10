import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import UnauthenticatedStack from '../domains/auth/UnauthenticatedStack';
import AuthenticatedStack from '../domains/AuthenticatedStack';
import {AuthContext} from '../domains/auth/AuthProvider';
import Loading from '../components/Loading';

export default function Routes() {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Handle user state changes
    function onAuthStateChanged(authenticatedUser) {
      setUser(authenticatedUser);
      if (initializing) {
        setInitializing(false);
      }
      setLoading(false);
    }
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, [setUser, initializing]);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
}
