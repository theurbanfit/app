import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Text} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useAvailableEventsFromScannedFacility} from './asyncHooks';

export default function CheckInScreen() {
  const [scannedFacilityId, setScannedFacilityId] = useState('');

  const {
    availableEventsFromScannedFacility,
  } = useAvailableEventsFromScannedFacility(scannedFacilityId);

  const onSuccess = e => {
    Alert.alert('Success', e.data);
    console.log(e.data);
    e?.data && setScannedFacilityId(e.data);
  };
  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess}
        topContent={<Text style={styles.centerText}>Scan the qr code</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
