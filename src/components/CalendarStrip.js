import React, {useRef} from 'react';
import Calendar from 'react-native-calendar-strip';
import moment from 'moment';
import {StyleSheet} from 'react-native';
import {divider, primary, textPrimary, white} from './colors';

export const CalendarStrip = ({
  selectedDay,
  setSelectedDay,
  today = moment(),
}) => {
  const {current} = useRef(today);
  return (
    <Calendar
      scrollable
      style={styles.calendar}
      minDate={current}
      maxDate={moment().add(15, 'days')}
      calendarAnimation={{type: 'sequence', duration: 30}}
      daySelectionAnimation={{type: 'background', duration: 300}}
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
    borderBottomColor: divider,
  },
  icon: {display: 'none'},
  header: {color: textPrimary, display: 'none'},
  dateNumber: {color: textPrimary},
  dateName: {color: textPrimary},
  highlight: {color: white},
  highlightBackground: {backgroundColor: primary},
});
