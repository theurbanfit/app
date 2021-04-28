import firestore from '@react-native-firebase/firestore';
import {
  convertTimeStringToMoment,
  deriveDayOfTheWeekFromDate,
} from '../../components/utils/datetime';
import moment from 'moment';

export const decreaseRemainingSeatsOfScheduledClass = async scheduledClassId => {
  try {
    const decrease = firestore.FieldValue.increment(-1);

    const scheduleSnap = await firestore()
      .collectionGroup('schedule')
      .where('scheduledClassId', '==', scheduledClassId)
      .get();
    scheduleSnap.docs.forEach(snapshot => {
      snapshot.ref.update({remainingSeats: decrease});
    });
  } catch (e) {
    console.error(e);
    debugger;
  }
};

export const increaseCheckInNumberOfUser = async uid => {
  try {
    const increase = firestore.FieldValue.increment(1);

    await firestore().collection('users').doc(uid).set(
      {
        totalCheckIns: increase,
      },
      {merge: true},
    );
  } catch (e) {
    console.error(e);
    debugger;
  }
};

export const retrieveScheduleFromFacilityId = async facilityId => {
  if (!facilityId) {
    console.log('facilityId is not yet defined. aka undefined');
    return;
  }

  const todaysDayOfTheWeek = deriveDayOfTheWeekFromDate();

  try {
    const scheduleSnap = await firestore()
      .collectionGroup('schedule')
      .where('facilityId', '==', facilityId)
      .where('dayOfTheWeek', '==', todaysDayOfTheWeek)
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

export const sortBasedOnStartTime = ({startTime: a}, {startTime: b}) =>
  moment(convertTimeStringToMoment(a)).diff(convertTimeStringToMoment(b));
