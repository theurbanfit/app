import React, {useState, memo} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {CalendarStrip} from '../../components/CalendarStrip';
import moment from 'moment';
import {ActivityCard} from '../../components/ActivityCard';
import {ContainerView} from '../../components/ContainerView';
import {useDistricts, useEventsForDate} from './asyncHooks/useEventsForDate';
import {ScrollView} from 'react-native-gesture-handler';
import {SearchTopBar} from '../../components/SearchTopBar';

export default memo(function ActivitiesScreen({navigation}) {
  const today = moment();
  const [selectedDay, setSelectedDay] = useState(today);

  const {events} = useEventsForDate(selectedDay);
  const {
    activeDistricts,
    allowedDistricts,
    setAllowedDistrict,
  } = useDistricts();

  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchTopBar
        allowedDistricts={allowedDistricts}
        onAllowedDistrictsSet={setAllowedDistrict}
        activeDistricts={activeDistricts}
      />
      <CalendarStrip
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <ScrollView>
        <ContainerView>
          {events &&
            events
              .filter(({districtId}) => {
                return allowedDistricts.some(
                  filteredDistrictId => districtId === filteredDistrictId,
                );
              })
              .map(
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
                  facilityDistrictName,
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
                        facilityDistrictName,
                        facilityDescription,
                        date: selectedDay,
                      })
                    }
                    key={scheduledClassId}
                    fullAddress={`${facilityAddress} • ${facilityDistrictName}`}
                    imageSrc={classPhotoUrl}
                    title={className}
                    timeRange={timeRange}
                    tags={classTags}
                  />
                ),
              )}
        </ContainerView>
      </ScrollView>
    </SafeAreaView>
  );
});
