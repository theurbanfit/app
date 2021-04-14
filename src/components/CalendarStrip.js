import React from 'react';
import Calendar from 'react-native-calendar-strip';
import moment from 'moment';
import {StyleSheet} from 'react-native';
import {divider, primary, textPrimary, white} from './colors';

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
      style={styles.calendar}
      iconStyle={styles.icon}
      calendarHeaderStyle={styles.header}
      calendarColor={white}
      dateNumberStyle={styles.dateNumber}
      dateNameStyle={styles.dateName}
      highlightDateNameStyle={styles.highlight}
      highlightDateNumberStyle={styles.highlight}
      highlightDateContainerStyle={styles.highlightBackground}
      selectedDate={selectedDay}
      onDateSelected={setSelectedDay}
      useIsoWeekday={false}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    height: 72,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: divider,
  },
  icon: {display: 'none'},
  header: {color: textPrimary, display: 'none'},
  dateNumber: {color: textPrimary},
  dateName: {color: textPrimary},
  highlight: {color: white},
  highlightBackground: {backgroundColor: primary},
});
