import React from 'react';
import {Headline, Text, useTheme} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {ScheduledActivityCard} from '../domains/profile/components/ScheduledActivityCard';
import {useNavigation} from '@react-navigation/native';
import {formatFirestoreDateToMoment} from './utils/datetime';
import moment from 'moment';
import {StyleSheet} from 'react-native';

export const UserSchedule = ({scheduledClasses}) => {
  const styles = useStyles();
  const navigation = useNavigation();

  const handleViewCardDetails = scheduledClassId => {
    const {
      imageSrc,
      title,
      facilityAddress,
      dateTimeFormatted,
      timeRange,
      tags,
      classId,
      classImportantInfo,
      classDescription,
      classPreparationInfo,
      classArrivalInfo,
      facilityDescription,
    } = scheduledClasses[scheduledClassId];

    return navigation.navigate('ActivityDetails', {
      imageSrc,
      title,
      facilityAddress,
      dateTime: formatFirestoreDateToMoment(dateTimeFormatted),
      timeRange,
      tags,
      scheduledClassId,
      classId,
      classImportantInfo,
      classDescription,
      classPreparationInfo,
      classArrivalInfo,
      facilityDescription,
    });
  };
  return (
    <>
      <Headline style={[styles.headline]}>Your Schedule</Headline>
      <ScrollView>
        <>
          {scheduledClasses ? (
            Object.values(scheduledClasses)
              .filter(({dateTimeFormatted}) =>
                formatFirestoreDateToMoment(dateTimeFormatted).isAfter(
                  moment().startOf('day'),
                ),
              )
              .sort(({dateTimeFormatted: a}, {dateTimeFormatted: b}) =>
                moment(formatFirestoreDateToMoment(a)).diff(
                  formatFirestoreDateToMoment(b),
                ),
              )
              .map(
                ({
                  title,
                  dateTimeFormatted,
                  scheduledClassId,
                  facilityAddress,
                }) => (
                  <ScheduledActivityCard
                    key={scheduledClassId}
                    title={title}
                    dateTime={formatFirestoreDateToMoment(dateTimeFormatted)}
                    scheduledClassId={scheduledClassId}
                    facilityAddress={facilityAddress}
                    onViewCard={() => handleViewCardDetails(scheduledClassId)}
                  />
                ),
              )
          ) : (
            <Text>Loading..</Text>
          )}
        </>
      </ScrollView>
    </>
  );
};

const useStyles = () => {
  const {colors} = useTheme();

  return StyleSheet.create({
    headline: {
      marginTop: 16,
      marginBottom: 28,
      color: colors.primary,
      alignSelf: 'center',
    },
  });
};
