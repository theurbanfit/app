import React from 'react';
import Calendar from 'react-native-calendar-strip';
import moment from 'moment';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

export const CalendarStrip = ({
  selectedDay,
  setSelectedDay,
  today = moment(),
}) => {
  const {
    styles,
    theme: {colors},
  } = useStyles();

  return (
    <Calendar
      scrollable
      style={styles.calendar}
      minDate={today}
      maxDate={moment().add(15, 'days')}
      calendarAnimation={{type: 'sequence', duration: 30}}
      daySelectionAnimation={{type: 'background', duration: 300}}
      calendarHeaderStyle={styles.header}
      calendarColor={colors.white}
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

const useStyles = () => {
  const {colors} = useTheme();

  return {
    theme: {colors},
    styles: StyleSheet.create({
      calendar: {
        color: colors.text,
        height: 72,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
      },
      icon: {display: 'none'},
      header: {
        color: colors.text,
        display: 'none',
      },
      dateNumber: {
        color: colors.text,
      },
      dateName: {
        color: colors.text,
      },
      highlight: {
        color: colors.secondary,
      },
      highlightBackground: {
        backgroundColor: colors.primary,
      },
    }),
  };
};
