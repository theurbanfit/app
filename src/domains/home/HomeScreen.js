import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import {FormButton} from '../../components/FormButton';
import {AuthContext} from '../auth/AuthProvider';
import {background} from '../../components/colors';

export default function HomeScreen() {
  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Title>Home Screen</Title>
      <Title>All chat rooms will be listed here</Title>
      <FormButton
        modeValue="contained"
        title="Logout"
        onPress={() => logout()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
