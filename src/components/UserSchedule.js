import React from 'react';
import {Headline, Text, Colors} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {ScheduledActivityCard} from '../domains/profile/components/ScheduledActivityCard';
import {useNavigation} from '@react-navigation/native';
import {formatFirestoreDateToMoment} from './utils/datetime';
import moment from 'moment';

export const UserSchedule = ({scheduledClasses}) => {
  const navigation = useNavigation();

  const handleViewCardDetails = scheduledClassId => {
    const {
      imageSrc,
      title,
      fullAddress,
      dateTimeFormatted,
      timeRange,
      tags,
      classId,
      classImportantInfo,
      classDescription,
      howToPrepare,
      howToArrive,
      facilityDescription,
    } = scheduledClasses[scheduledClassId];

    return navigation.navigate('ActivityDetails', {
      imageSrc,
      title,
      fullAddress,
      dateTime: formatFirestoreDateToMoment(dateTimeFormatted),
      timeRange,
      tags,
      scheduledClassId,
      classId,
      classImportantInfo,
      classDescription,
      howToPrepare,
      howToArrive,
      facilityDescription,
    });
  };
  return (
    <ScrollView>
      <Headline
        style={{
          marginTop: 16,
          marginBottom: 28,
          color: Colors.deepPurpleA400,
          alignSelf: 'center',
        }}>
        Your Schedule
      </Headline>
      {scheduledClasses ? (
        Object.values(scheduledClasses)
          .sort(({dateTimeFormatted: a}, {dateTimeFormatted: b}) =>
            moment(formatFirestoreDateToMoment(a)).diff(
              formatFirestoreDateToMoment(b),
            ),
          )
          .map(({title, dateTimeFormatted, scheduledClassId, fullAddress}) => (
            <ScheduledActivityCard
              key={scheduledClassId}
              title={title}
              dateTime={formatFirestoreDateToMoment(dateTimeFormatted)}
              scheduledClassId={scheduledClassId}
              fullAddress={fullAddress}
              onViewCard={() => handleViewCardDetails(scheduledClassId)}
            />
          ))
      ) : (
        <Text>Loading..</Text>
      )}
    </ScrollView>
  );
};
