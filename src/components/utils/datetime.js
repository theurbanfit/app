import moment from 'moment';

export const mapNumberToWeekDays = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
};

export const convertTimeToDateTimeString = startTime => {
  return formatActivityDateForFirestore(convertTimeStringToMoment(startTime));
};
export const convertTimeStringToMoment = (
  startTime,
  selectedDate = moment(),
) => {
  const day = selectedDate.utcOffset(-5);
  const splitTime = startTime.split(/:/);
  return day
    .hours(parseInt(splitTime[0], 10))
    .minutes(parseInt(splitTime[1], 10))
    .seconds(0)
    .milliseconds(0);
};

export const deriveTimeRange = (startTime, durationInMinutes) => {
  const startMoment = convertTimeStringToMoment(startTime);
  const endMoment = moment(startMoment).add({minutes: durationInMinutes});

  return `${startMoment.format('H:mm')} - ${endMoment.format('H:mm')}`;
};

export const displayActivityDate = dateTime =>
  `${dateTime.calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'ddd',
  })}, ${dateTime.format('D MMM')}`;

export const displayActivityDateAndTime = dateTime =>
  `${dateTime.calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'ddd',
  })}, ${dateTime.format(' D MMM H:mm')}`;

export const formatActivityDateForFirestore = dateTime =>
  dateTime.format('dddd, MMMM Do YYYY, HH:mm:ss');

export const formatFirestoreDateToMoment = dateTimeFormatted =>
  moment(dateTimeFormatted, 'dddd, MMMM Do YYYY, HH:mm:ss');

export const deriveDayOfTheWeekFromDate = (date = moment()) => {
  const numberOfTheDay = date.day();
  return mapNumberToWeekDays[numberOfTheDay];
};
