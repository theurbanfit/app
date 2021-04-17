import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AuthProvider} from '../domains/auth/AuthProvider';
import Routes from './Routes';
import {ProfileProvider} from '../domains/profile/ProfileProvider';

export default function Index() {
  return (
    <PaperProvider>
      <AuthProvider>
        <ProfileProvider>
          <Routes />
        </ProfileProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
