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
    blue: '#0071f3',
    mintGreen: '#98FB98',
    mintGreenSecondary: '#00DAC3',
    mintGreenSecondary300: '#00BBA7',
    mintGreenSecondary500: '#00B4A1',
    mintGreenSecondary700: '#08908E',
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
