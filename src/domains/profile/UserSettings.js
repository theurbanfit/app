import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Divider, Button, useTheme} from 'react-native-paper';
import {AuthContext} from '../auth/AuthProvider';
import {ContainerView} from '../../components/ContainerView';

export default function UserSettingsScreen() {
  const {logout} = useContext(AuthContext);
  const {colors} = useTheme();
  return (
    <SafeAreaView>
      <ContainerView style={styles.flexRow}>
        <Divider />
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
    flexDirection: 'row',
  },
});
