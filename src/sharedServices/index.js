import firestore from '@react-native-firebase/firestore';

export const queryActiveUser = uid => firestore().collection('users').doc(uid);

export const retrieveFacility = async facilityId => {
  try {
    const res = await firestore()
      .collection('facilities')
      .doc(facilityId)
      .get();
    return res.data();
  } catch (e) {
    console.error(e);
    debugger;
  }
};
