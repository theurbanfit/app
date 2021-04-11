import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleAuthErrors = ({code, message}) => {
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
        register: async (email, password) => {
          try {
            const currentUser = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );

            console.log(currentUser);
            // const document = firebase$
            // .firestore()
            // .collection('users')
            // .doc(uid)
            const document = firestore().collection('users');
            // .doc(currentUser.uid);

            console.log(currentUser);
            debugger;
            document.add({
              email: currentUser.email,
              uid: currentUser.uid,
            });

            console.log(currentUser);
            setError(null);
          } catch (e) {
            console.log(e);
            debugger;
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
        passwordReset: email => {
          return auth().sendPasswordResetEmail(email);
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
