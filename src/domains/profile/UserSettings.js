import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Divider, Button} from 'react-native-paper';
import {AuthContext} from '../auth/AuthProvider';
import {ContainerView} from '../../components/ContainerView';

export default function UserSettingsScreen() {
  const {logout} = useContext(AuthContext);

  return (
    <SafeAreaView>
      <ContainerView style={styles.flexRow}>
        <Divider />
        <Button modeValue="contained" onPress={() => logout()}>
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
    flexDirection: 'row',
  },
});
