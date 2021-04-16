import firestore from '@react-native-firebase/firestore';

export const retrieveActiveUser = async uid =>
  await firestore().collection('users').doc(uid).get();
