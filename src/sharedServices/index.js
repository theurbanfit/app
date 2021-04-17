import firestore from '@react-native-firebase/firestore';

export const retrieveActiveUser = async uid =>
  await firestore().collection('users').doc(uid).get();

export const retrieveScheduledClasses = async uid => {
  const snapshot = await retrieveActiveUser(uid);
  const {schedule} = snapshot.data();
  return schedule || {};
};
