import firestore from '@react-native-firebase/firestore';

export const updateUserSchedule = async (
  user,
  {scheduledClassId, title, dateTime, classId},
) => {
  await firestore()
    .collection('users')
    .doc(user.uid)
    .update({
      [`schedule.${scheduledClassId}`]: {
        scheduledClassId,
        title,
        dateTime,
        classId,
      },
    });
};

export const retrieveFacilities = async () =>
  await firestore().collection('facilities').get();
