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
    console.error(e);
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
    console.error(e);
    debugger;
  }
};

export const retrieveFacilities = async () => {
  try {
    const res = await firestore().collection('facilities').get();
    return res.docs.map(item => item.data());
  } catch (e) {
    console.error(e);
    debugger;
  }
};

export const retrieveClass = async classId => {
  try {
    const res = await firestore()
      .collectionGroup('classes')
      .where('classId', '==', classId)
      .get();

    return res.docs[0].data();
  } catch (e) {
    console.error(e);
    debugger;
  }
};

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

export const retrieveDistrict = async districtId => {
  try {
    const res = await firestore()
      .collectionGroup('districts')
      .where('districtId', '==', districtId)
      .get();

    return res.docs[0].data();
  } catch (e) {
    console.error(e);
    debugger;
  }
};

export const retrieveScheduleForDayOfTheWeek = async dayOfTheWeek => {
  try {
    const scheduleSnap = await firestore()
      .collectionGroup('schedule')
      .where('dayOfTheWeek', '==', dayOfTheWeek)
      .get();
    return scheduleSnap.docs.map(doc => doc.data());
  } catch (e) {
    console.error(e);
    debugger;
    return [];
  }
};
