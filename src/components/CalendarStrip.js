import React from 'react';
import Calendar from 'react-native-calendar-strip';
import moment from 'moment';
import {
  backgroundSecondary,
  divider,
  primary,
  textPrimary,
  white,
} from './colors';

export const CalendarStrip = ({
  selectedDay,
  setSelectedDay,
  today = moment(),
}) => {
  return (
    <Calendar
      scrollable
      minDate={today}
      calendarAnimation={{type: 'sequence', duration: 30}}
      daySelectionAnimation={{type: 'background', duration: 300}}
      style={{
        height: 72,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: `1px solid ${divider}`,
      }}
      iconStyle={{display: 'none'}}
      calendarHeaderStyle={{color: textPrimary, display: 'none'}}
      calendarColor={backgroundSecondary}
      dateNumberStyle={{color: textPrimary}}
      dateNameStyle={{color: textPrimary}}
      highlightDateNameStyle={{color: white}}
      highlightDateNumberStyle={{color: white}}
      highlightDateContainerStyle={{backgroundColor: primary}}
      selectedDate={selectedDay}
      onDateSelected={setSelectedDay}
      useIsoWeekday={false}
    />
  );
};
