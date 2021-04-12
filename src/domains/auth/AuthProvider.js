import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleAuthErrors = ({code, message}) => {
    console.log(message);
    switch (code) {
      case 'auth/email-already-exists':
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
      default:
        setError(message);
        break;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        setError,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
            setError(null);
          } catch (e) {
            handleAuthErrors(e);
          }
        },
        register: async ({email, password, firstName, lastName}) => {
          try {
            const {
              user: currentUser,
            } = await auth().createUserWithEmailAndPassword(email, password);

            firestore().collection('users').doc(currentUser.uid).set({
              email: currentUser.email,
              uid: currentUser.uid,
              firstName,
              lastName,
            });
            await currentUser.updateProfile({
              displayName: `${firstName} ${lastName}`,
            });
            await currentUser.sendEmailVerification();
            await currentUser.reload();
            setError(null);
          } catch (e) {
            handleAuthErrors(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
            setError(null);
          } catch (e) {
            handleAuthErrors(e);
          }
        },
        passwordReset: async email => {
          await auth().sendPasswordResetEmail(email);
          Alert.alert('Success', 'Email has been sent, check your mailbox');
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
