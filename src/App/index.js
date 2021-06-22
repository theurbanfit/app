import React from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {AuthProvider} from '../domains/auth/AuthProvider';
import Routes from './Routes';
import {ProfileProvider} from '../domains/profile/ProfileProvider';
import {StripeProvider} from '@stripe/stripe-react-native/src/components/StripeProvider';
import UserSubscriptions from '../domains/profile/UserSubscriptionsScreen';
import {SafeAreaView} from 'react-native';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ECFF6B',
    primaryBackground: '#e7ff35',
    primaryLight: '#f1fe9c',
    primaryLight200: '#F8FEDB',
    primaryDark: '#D7F31B',
    background: '#f5fbff',
    background100: '#f5feff',
    textLight: '#3d819a',
    textDark: '#002f67',
    text: '#002a32',
    secondary: '#003540',
    secondaryBackground: '#1c859a',
    inactive: '#BECBCC',
    divider: '#e7e9ff',
    white: '#FFFFFF',
  },
};

export default function Index() {
  return (
    <SafeAreaView>
      <StripeProvider
        publishableKey={'pk_test_4pH5SY6DArgCu0SQDfnKc3Dt00OdZtA6aQ'}
        merchantIdentifier="merchant.identifier">
        <UserSubscriptions />
      </StripeProvider>
    </SafeAreaView>
  );
}
