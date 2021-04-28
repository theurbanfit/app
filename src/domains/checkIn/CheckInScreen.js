import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useTheme, Headline} from 'react-native-paper';
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
      <QRCodeScanner
        showMarker
        onRead={onSuccess}
        cameraStyle={styles.cameraStyle}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <Headline style={styles.colorWhite}>Scan the QR code</Headline>
            </View>

            <View style={styles.flexRow}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle} />

              <View style={styles.leftAndRightOverlay} />
            </View>

            <View style={styles.bottomOverlay} />
          </View>
        }
      />
    </View>
  );
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const useStyles = () => {
  const {colors} = useTheme();
  const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency
  const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
  const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width

  return StyleSheet.create({
    cameraStyle: {
      height: SCREEN_HEIGHT,
    },
    markerStyle: {
      borderColor: colors.white,
      borderRadius: 20,
    },
    container: {
      flex: 1,
    },
    modalBackground: {backgroundColor: colors.white},

    flexRow: {flexDirection: 'row'},
    colorWhite: {color: 'white'},
    rectangleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },

    rectangle: {
      height: rectDimensions,
      width: rectDimensions,
      borderWidth: rectBorderWidth,
      borderColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },

    topOverlay: {
      flex: 1,
      height: SCREEN_WIDTH,
      width: SCREEN_WIDTH,
      backgroundColor: overlayColor,
      justifyContent: 'center',
      alignItems: 'center',
    },

    bottomOverlay: {
      flex: 1,
      height: SCREEN_WIDTH,
      width: SCREEN_WIDTH,
      backgroundColor: overlayColor,
      paddingBottom: SCREEN_WIDTH * 0.25,
    },

    leftAndRightOverlay: {
      height: SCREEN_WIDTH * 0.65,
      width: SCREEN_WIDTH,
      backgroundColor: overlayColor,
    },
  });
};
