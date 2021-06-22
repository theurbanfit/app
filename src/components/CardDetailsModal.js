import React, {useEffect, useState} from 'react';
import {StyleSheet, Alert, SafeAreaView} from 'react-native';
import {useStripe} from '@stripe/stripe-react-native';
import {FormButton} from './FormButton';
import {subscribeUser} from '../domains/subscription/services';
import {useProfile} from '../domains/profile/ProfileProvider';

export default function CardDetailsModal() {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState();
  const {profile} = useProfile();

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    setLoading(true);
    try {
      const {error} = await presentPaymentSheet({clientSecret});

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        Alert.alert('Success', 'You can start your free two weeks trial');
        profile.uid && (await subscribeUser(profile.uid));
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
        const {paymentIntent, ephemeralKey, customer} =
          await fetchPaymentSheetParams();
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

  return (
    <SafeAreaView style={styles.flexRow}>
      <FormButton
        title="Choose"
        modeValue="contained"
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
