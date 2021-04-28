import firestore from '@react-native-firebase/firestore';
import {
  convertTimeStringToMoment,
  deriveDayOfTheWeekFromDate,
} from '../../components/utils/datetime';
import moment from 'moment';

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

export const retrieveScheduleFromFacilityId = async facilityId => {
  if (!facilityId) {
    console.log('facilityId is not yet defined. aka undefined');
    return;
  }
  // today
  const dayOfTheWeek = deriveDayOfTheWeekFromDate();

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

export const sortBasedOnStartTime = ({startTime: a}, {startTime: b}) =>
  moment(convertTimeStringToMoment(a)).diff(convertTimeStringToMoment(b));
