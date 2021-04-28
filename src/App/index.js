import React from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {AuthProvider} from '../domains/auth/AuthProvider';
import Routes from './Routes';
import {ProfileProvider} from '../domains/profile/ProfileProvider';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    background: '#FDFDFD',
    text: '#031323',
    textSecondary: '#24292e',
    textLight: '#727272',
    mintGreen: '#98FB98',
    secondary: '#00DAC3',
    secondary200: '#d100d1',
    secondary400: '#b100e8',
    secondary600: '#8900f2',
    secondary800: '#6a00f4',
    blue: '#2d00f7',
    warning: '#D97508',
    divider: '#D9DCDE',
    white: '#FFFFFF',
  },
};

export default function Index() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <ProfileProvider>
          <Routes />
        </ProfileProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
