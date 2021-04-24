import React, {useState, memo} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {CalendarStrip} from '../../components/CalendarStrip';
import moment from 'moment';
import {ActivityCard} from '../../components/ActivityCard';
import {ContainerView} from '../../components/ContainerView';
import {useDistricts, useEventsForDate} from './asyncHooks/useEventsForDate';
import {ScrollView} from 'react-native-gesture-handler';
import {SearchTopBar} from '../../components/SearchTopBar';
import fuzzy from 'fuzzysearch';
import {formatActivityDateForFirestore} from '../../components/utils/datetime';

export default memo(function ActivitiesScreen({navigation}) {
  const today = moment();
  const [selectedDay, setSelectedDay] = useState(today);
  const [searchQuery, setSearchQuery] = useState('');

  const {events} = useEventsForDate(selectedDay);
  const {
    activeDistricts,
    allowedDistricts,
    setAllowedDistrict,
  } = useDistricts();

  return (
    <SafeAreaView style={styles.flexOne}>
      <SearchTopBar
        activeDistricts={activeDistricts}
        allowedDistricts={allowedDistricts}
        searchQuery={searchQuery}
        onAllowedDistrictsSet={setAllowedDistrict}
        onSearchQuerySet={setSearchQuery}
      />
      <CalendarStrip
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <ScrollView>
        <ContainerView>
          {events &&
            events
              .filter(({className, classTags}) => {
                if (searchQuery.length === 0) {
                  return true;
                }
                return (
                  fuzzy(searchQuery.toLowerCase(), className.toLowerCase()) ||
                  classTags.some(item =>
                    fuzzy(searchQuery.toLowerCase(), item.toLowerCase()),
                  )
                );
              })
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
                  eventDateTime,
                  eventTimeRange,
                  scheduledClassId,
                }) => (
                  <ActivityCard
                    onPress={() =>
                      navigation.navigate('ActivityDetails', {
                        imageSrc: classPhotoUrl,
                        title: className,
                        facilityAddress,
                        eventDateTimeFormatted: formatActivityDateForFirestore(
                          eventDateTime,
                        ),
                        eventTimeRange,
                        classTags,
                        scheduledClassId,
                        classId,
                        classImportantInfo,
                        classDescription,
                        classPreparationInfo,
                        classArrivalInfo,
                        facilityDistrictName,
                        facilityDescription,
                      })
                    }
                    key={scheduledClassId}
                    fullAddress={`${facilityAddress} • ${facilityDistrictName}`}
                    imageSrc={classPhotoUrl}
                    title={className}
                    timeRange={eventTimeRange}
                    tags={classTags}
                  />
                ),
              )}
        </ContainerView>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  flexOne: {flex: 1},
});
