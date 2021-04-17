import firestore from '@react-native-firebase/firestore';

export const addClassToUserSchedule = async (uid, classDetailsObject) => {
  try {
    await firestore()
      .collection('users')
      .doc(uid)
      .update({
        [`schedule.${classDetailsObject.scheduledClassId}`]: classDetailsObject,
      });
  } catch (e) {
    debugger;
  }
};

export const removeClassFromUserSchedule = async (
  uid,
  removalCandidateScheduledClassId,
) => {
  try {
    await firestore()
      .collection('users')
      .doc(uid)
      .update({
        [`schedule.${removalCandidateScheduledClassId}`]: firestore.FieldValue.delete(),
      });
  } catch (e) {
    debugger;
  }
};

export const retrieveFacilities = async () =>
  await firestore().collection('facilities').get();
