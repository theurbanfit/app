import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Alert} from 'react-native';
import {ContainerView} from '../../components/ContainerView';
import {useStripe} from '@stripe/stripe-react-native';
import {useProfile} from './ProfileProvider';
import {FormButton} from '../../components/FormButton';

export default function UserSubscriptions() {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState();
  const {
    profile: {stripeId},
  } = useProfile();

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    setLoading(true);
    try {
      debugger;
      const {error} = await presentPaymentSheet({clientSecret});

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
          customer: stripeId,
        };
      };
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
    };
    stripeId && initializePaymentSheet();
  }, [stripeId, initPaymentSheet]);

  return (
    <ContainerView style={styles.flexRow}>
      <FormButton
        title="Show Sheet"
        modeValue="contained"
        onPress={openPaymentSheet}
        labelStyle={styles.loginButtonLabel}
        disabled={!loading}
      />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    margin: 12,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
