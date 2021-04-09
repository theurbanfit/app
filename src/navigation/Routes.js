import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {AuthContext} from './AuthProvider';
import Loading from '../components/Loading';

export default function Routes() {
  const {authenticatedUser, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
      setLoading(false);
    }

    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, [initializing, setUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {authenticatedUser ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
