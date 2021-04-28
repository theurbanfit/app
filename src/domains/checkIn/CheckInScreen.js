import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useAvailableEventsFromScannedFacility} from './asyncHooks';

export default function CheckInScreen({navigation}) {
  const styles = useStyles();

  const [scannedFacilityId, setScannedFacilityId] = useState('');
  const onSuccess = e => {
    e?.data && setScannedFacilityId(e.data);
  };

  const {
    availableScannedEventsForTheRestOfTheDay,
  } = useAvailableEventsFromScannedFacility(scannedFacilityId);
  useEffect(() => {
    if (Array.isArray(availableScannedEventsForTheRestOfTheDay)) {
      navigation.navigate('Available Scanned Events', {
        availableScannedEventsForTheRestOfTheDay,
      });
    }
  }, [navigation, availableScannedEventsForTheRestOfTheDay, scannedFacilityId]);

  return (
    <View style={styles.container}>
      <QRCodeScanner showMarker onRead={onSuccess} />
    </View>
  );
}

const screenHeight = Dimensions.get('window').height;

const useStyles = () => {
  const {colors} = useTheme();

  return StyleSheet.create({
    cameraStyle: {
      height: screenHeight,
    },
    markerStyle: {
      borderColor: colors.white,
      borderRadius: 20,
    },
    container: {
      flex: 1,
    },
    modalBackground: {backgroundColor: colors.white},
  });
};
