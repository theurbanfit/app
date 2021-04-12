import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import UnauthenticatedStack from './UnauthenticatedStack';
import AuthenticatedStack from './AuthenticatedStack';
import {AuthContext} from '../domains/auth/AuthProvider';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView, StyleSheet} from 'react-native';

export default function Routes() {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
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
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" animating={true} />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
});
