import firestore from '@react-native-firebase/firestore';

export const addClassToUserSchedule = async (user, classDetailsObject) => {
  try {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        [`schedule.${classDetailsObject.scheduledClassId}`]: classDetailsObject,
      });
  } catch (e) {
    debugger;
  }
};

export const removeClassFromUserSchedule = async (
  user,
  removalCandidateScheduledClassId,
) => {
  try {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        [`schedule.${removalCandidateScheduledClassId}`]: firestore.FieldValue.delete(),
      });
  } catch (e) {
    debugger;
  }
};

export const retrieveFacilities = async () =>
  await firestore().collection('facilities').get();
