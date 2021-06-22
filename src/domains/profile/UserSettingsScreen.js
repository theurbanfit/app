import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {AuthContext} from '../auth/AuthProvider';
import {ContainerView} from '../../components/ContainerView';
import {useNavigation} from '@react-navigation/native';
import {useProfile} from './ProfileProvider';

export default function UserSettingsScreen() {
  const {logout} = useContext(AuthContext);
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {profile} = useProfile();

  return (
    <SafeAreaView>
      <ContainerView style={styles.flexRow}>
        {profile.userHasActivatedSubscription && (
          <Button
            color={colors.secondary}
            modeValue="contained"
            onPress={() => navigation.navigate('Subscription Options')}>
            Subscriptions
          </Button>
        )}
        <Button
          color={colors.secondary}
          modeValue="contained"
          onPress={() => logout()}>
          Logout
        </Button>
      </ContainerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    margin: 12,
    justifyContent: 'center',
  },
});
