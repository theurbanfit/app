import React, {createContext, useState} from 'react';
import firebaseAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});
  const [error, setError] = useState(null);

  const handleAuthErrors = ({code, message}) => {
    console.error(message);
    switch (code) {
      case 'auth/email-already-in-use':
      case 'auth/account-exists-with-different-credential':
        setError('Account already exists');
        break;
      case 'auth/invalid-credential':
      case 'auth/invalid-email':
      case 'auth/invalid-password':
        setError('Your credentials are invalid.');
        break;
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        setError('Your credentials are invalid.');
        break;
      case 'auth/weak-password':
        setError('Choose a stronger password');
        break;
      default:
        setError(message);
        break;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        error,
        setError,
        login: async ({email, password}, onErrorStopLoading) => {
          try {
            await firebaseAuth().signInWithEmailAndPassword(email, password);
            setError(null);
          } catch (e) {
            onErrorStopLoading();
            handleAuthErrors(e);
          }
        },
        register: async (
          {email, password, firstName, lastName},
          onErrorStopLoading,
        ) => {
          try {
            const firebase =
              await firebaseAuth().createUserWithEmailAndPassword(
                email,
                password,
              );

            await firestore()
              .collection('users')
              .doc(firebase.user.uid)
              .set({
                uid: firebase.user.uid,
                email,
                firstName,
                lastName,
                displayName: `${firstName} ${lastName}`,
                schedule: {},
                userHasActivatedSubscription: false,
              });
            await firebase.user.sendEmailVerification();
            setError(null);
          } catch (e) {
            onErrorStopLoading();
            handleAuthErrors(e);
          }
        },
        logout: async () => {
          try {
            await firebaseAuth().signOut();
            setError(null);
          } catch (e) {
            handleAuthErrors(e);
          }
        },
        passwordReset: async email => {
          await firebaseAuth().sendPasswordResetEmail(email);
          Alert.alert('Success', 'Email has been sent, check your mailbox');
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
