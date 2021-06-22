import React, {useEffect, useState} from 'react';
import {StyleSheet, Alert, Button, SafeAreaView} from 'react-native';
import {useStripe} from '@stripe/stripe-react-native';

export default function UserSubscriptions() {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState();

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    setLoading(true);
    try {
      const {error} = await presentPaymentSheet({clientSecret});
      console.log(clientSecret);
      debugger;

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        Alert.alert('Success', 'Your order is confirmed!');
      }
    } catch (e) {
      debugger;
    }
  };

  useEffect(() => {
    const initializePaymentSheet = async () => {
      const fetchPaymentSheetParams = async () => {
        const response = await fetch(
          'https://us-central1-urbanfit-dev.cloudfunctions.net/completePaymentWithStripe',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const {paymentIntent, ephemeralKey} = await response.json();

        setClientSecret(paymentIntent);
        return {
          paymentIntent,
          ephemeralKey,
          customer: 'cus_JfTwkBBclanmy0',
        };
      };
      try {
        const {
          paymentIntent,
          ephemeralKey,
          customer,
        } = await fetchPaymentSheetParams();
        const {error} = await initPaymentSheet({
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: paymentIntent,
        });
        if (!error) {
          setLoading(true);
        }
      } catch (e) {
        debugger;
      }
    };
    initializePaymentSheet();
  }, [initPaymentSheet]);

  console.log('@@@@@@@@');
  return (
    <SafeAreaView style={styles.flexRow}>
      <Button
        title="Show Sheet"
        onPress={openPaymentSheet}
        disabled={!loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    margin: 12,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
