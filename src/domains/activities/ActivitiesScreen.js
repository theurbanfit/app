import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Title} from 'react-native-paper';
import {AuthContext} from '../auth/AuthProvider';

export default function ActivitiesScreen() {
  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Title>Urbanfit{'\u00A9'}</Title>
      <Button
        modeValue="contained"
        onPress={() => {
          logout();
        }}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
