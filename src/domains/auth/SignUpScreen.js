import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, IconButton, HelperText} from 'react-native-paper';
import {FormInput} from '../../components/FormInput';
import {FormButton} from '../../components/FormButton';
import {AuthContext} from './AuthProvider';

export default function SignupScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const {register, setError, error} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Register to chat</Title>
      <FormInput
        editable={!loading}
        labelName="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={userEmail => setEmail(userEmail)}
      />
      <FormInput
        editable={!loading}
        labelName="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={userPassword => setPassword(userPassword)}
      />
      <FormInput
        editable={!loading}
        labelName="First name"
        value={firstName}
        onChangeText={userFirstName => setFirstName(userFirstName)}
      />
      <FormInput
        editable={!loading}
        labelName="Last name"
        value={lastName}
        onChangeText={userLastName => setLastName(userLastName)}
      />
      {error ? (
        <HelperText type="error" visible={Boolean(error)}>
          {error}
        </HelperText>
      ) : null}

      <FormButton
        title="Signup"
        modeValue="contained"
        onPress={async () => {
          if (
            email.length &&
            password.length &&
            firstName.length &&
            lastName.length
          ) {
            setLoading(true);
            await register({email, password, firstName, lastName});
            setLoading(false);
          } else {
            setError('All values are required');
          }
        }}
        loading={loading}
        disabled={loading}
        labelStyle={styles.loginButtonLabel}
      />

      <IconButton
        icon="keyboard-backspace"
        size={30}
        style={styles.navButton}
        color="#6646ee"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 18,
  },
  navButton: {
    marginTop: 10,
  },
});
