import React from 'react';
import Calendar from 'react-native-calendar-strip';
import moment from 'moment';
import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

export const CalendarStrip = ({
  selectedDay,
  setSelectedDay,
  today = moment(),
}) => {
  return (
    <Calendar
      scrollable
      style={styles.calendar}
      minDate={today}
      maxDate={moment().add(15, 'days')}
      calendarAnimation={{type: 'sequence', duration: 30}}
      daySelectionAnimation={{type: 'background', duration: 300}}
      calendarHeaderStyle={styles.header}
      calendarColor={Colors.white}
      dateNumberStyle={styles.dateNumber}
      dateNameStyle={styles.dateName}
      highlightDateNameStyle={styles.highlight}
      highlightDateNumberStyle={styles.highlight}
      highlightDateContainerStyle={styles.highlightBackground}
      selectedDate={selectedDay}
      onDateSelected={setSelectedDay}
      useIsoWeekday={false}
      leftSelector={[]}
      rightSelector={[]}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    height: 72,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  icon: {display: 'none'},
  header: {
    color: Colors.textPrimary,
    display: 'none',
  },
  dateNumber: {
    color: Colors.textPrimary,
  },
  dateName: {
    color: Colors.textPrimary,
  },
  highlight: {
    color: Colors.white,
  },
  highlightBackground: {
    backgroundColor: Colors.primary,
  },
});
