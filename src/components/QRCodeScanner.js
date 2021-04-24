import React, {useState} from 'react';
import {Colors, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

export const QRCodeScanner = ({instructions}) => {
  const [barcode, setBarcode] = useState([]);

  const barcodeRecognized = ({barcodes}) => setBarcode({barcodes});
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>To get started, edit App.js</Text>
      <Text style={styles.instructions}>{instructions}</Text>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        onGoogleVisionBarcodesDetected={barcodeRecognized}
        style={{
          flex: 1,
          width: '100%',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    marginBottom: 12,
  },
  text: {
    color: Colors.textPrimary,
    fontSize: 14,
  },
});
