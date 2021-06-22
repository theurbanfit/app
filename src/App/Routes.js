import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import firebaseAuth from '@react-native-firebase/auth';
import UnauthenticatedStack from './UnauthenticatedStack';
import AuthenticatedStack from './AuthenticatedStack';
import {AuthContext} from '../domains/auth/AuthProvider';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useProfile} from '../domains/profile/ProfileProvider';
import SubscriptionStack from './SubscriptionStack';

export default function Routes() {
  const {auth, setAuth} = useContext(AuthContext);
  const {profile, isProfileLoading} = useProfile();
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    function onAuthStateChanged(authenticatedUser) {
      setAuth(authenticatedUser);
      if (initializing) {
        setInitializing(false);
      }
      setLoading(false);
    }
    return firebaseAuth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, [setAuth, initializing]);

  if (loading || isProfileLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" animating={true} />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      {(() => {
        if (auth && profile.userHasActivatedSubscription) {
          return <AuthenticatedStack />;
        } else if (auth && profile && !profile.userHasActivatedSubscription) {
          return <SubscriptionStack />;
        } else {
          return <UnauthenticatedStack />;
        }
      })()}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
});
