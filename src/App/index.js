import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AuthProvider} from '../domains/auth/AuthProvider';
import Routes from './Routes';

export default function Index() {
  return (
    <PaperProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </PaperProvider>
  );
}
