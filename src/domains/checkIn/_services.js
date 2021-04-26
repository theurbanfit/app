import firestore from '@react-native-firebase/firestore';

export const retrieveScheduleFrom = async districtId => {
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

export const retrieveScheduleFromFacilityId = async (
  facilityId,
  dayOfTheWeek = 'mon',
) => {
  if (!facilityId) {
    console.error('facilityId undefined');
    return;
  }

  try {
    const scheduleSnap = await firestore()
      .collectionGroup('schedule')
      .where('facilityId', '==', facilityId)
      .where('dayOfTheWeek', '==', dayOfTheWeek)
      .get();

    return scheduleSnap.docs.map(doc => doc.data());
  } catch (e) {
    console.error(e);
    debugger;
  }
};

export const retrieveScheduleFromClassId = async classId => {
  if (!classId) {
    console.error('classId undefined');
    return;
  }

  try {
    const res = await firestore()
      .collection(`classes/${classId}/schedule`)
      .get();
    return res.docs.map(item => item.data());
  } catch (e) {
    console.error(e);
    debugger;
  }
};
