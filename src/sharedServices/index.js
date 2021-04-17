import firestore from '@react-native-firebase/firestore';

export const queryActiveUser = uid => firestore().collection('users').doc(uid);

export const retrieveActiveUser = async uid => await queryActiveUser(uid).get();

export const retrieveScheduledClasses = async uid => {
  const snapshot = await retrieveActiveUser(uid);
  const {schedule} = snapshot.data();
  return schedule || {};
};
