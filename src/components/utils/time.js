import moment from 'moment';

export const convertTimeStringToMoment = startTime => {
  const day = moment().zone('EST');
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

export const sortArrayByHour = ({startTime: a}, {startTime: b}) => {
  return moment(a).diff(b);
};
