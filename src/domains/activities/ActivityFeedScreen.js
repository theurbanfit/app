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
              fullAddress,
              bannerUrl,
              name,
              dateTime,
              timeRange,
              scheduledClassId,
              tags,
              classId,
              classImportantInfo,
              classDescription,
              howToPrepare,
              howToArrive,
              facilityDescription,
            }) => (
              <ActivityCard
                onPress={() =>
                  navigation.navigate('ActivityDetails', {
                    imageSrc: bannerUrl,
                    title: name,
                    fullAddress,
                    dateTime,
                    timeRange,
                    tags,
                    scheduledClassId,
                    classId,
                    classImportantInfo,
                    classDescription,
                    howToPrepare,
                    howToArrive,
                    facilityDescription,
                    date: selectedDay,
                  })
                }
                key={scheduledClassId}
                fullAddress={fullAddress}
                imageSrc={bannerUrl}
                title={name}
                timeRange={timeRange}
                tags={tags}
              />
            ),
          )}
      </ContainerView>
    </SafeAreaView>
  );
});
