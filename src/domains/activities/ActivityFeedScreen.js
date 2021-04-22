import React, {useState, memo} from 'react';
import {SafeAreaView} from 'react-native';
import {CalendarStrip} from '../../components/CalendarStrip';
import moment from 'moment';
import {ActivityCard} from '../../components/ActivityCard';
import {ContainerView} from '../../components/ContainerView';
import {useEventsForDate} from './asyncHooks/useEventsForDate';

export default memo(function ActivitiesScreen({navigation}) {
  const today = moment();
  const [selectedDay, setSelectedDay] = useState(today);
  const {events} = useEventsForDate(selectedDay);

  return (
    <SafeAreaView>
      <CalendarStrip
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <ContainerView>
        {events &&
          events.map(
            ({
              facilityAddress,
              classPhotoUrl,
              className,
              classTags,
              classId,
              classImportantInfo,
              classDescription,
              classPreparationInfo,
              classArrivalInfo,

              facilityDescription,
              dateTime,
              timeRange,
              scheduledClassId,
            }) => (
              <ActivityCard
                onPress={() =>
                  navigation.navigate('ActivityDetails', {
                    imageSrc: classPhotoUrl,
                    title: className,
                    facilityAddress,
                    dateTime,
                    timeRange,
                    classTags,
                    scheduledClassId,
                    classId,
                    classImportantInfo,
                    classDescription,
                    classPreparationInfo,
                    classArrivalInfo,
                    facilityDescription,
                    date: selectedDay,
                  })
                }
                key={scheduledClassId}
                fullAddress={facilityAddress}
                imageSrc={classPhotoUrl}
                title={className}
                timeRange={timeRange}
                tags={classTags}
              />
            ),
          )}
      </ContainerView>
    </SafeAreaView>
  );
});
