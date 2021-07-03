import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {AuthContext} from '../auth/AuthProvider';
import {ContainerView} from '../../components/ContainerView';
import {useNavigation} from '@react-navigation/native';

export default function UserSettingsScreen() {
  const {logout} = useContext(AuthContext);
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ContainerView style={styles.flexRow}>
        <Button
          color={colors.secondary}
          modeValue="contained"
          onPress={() => navigation.navigate('Subscription Options')}>
          Subscriptions
        </Button>
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
