import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, HelperText} from 'react-native-paper';
import {FormInput} from '../../components/FormInput';
import {FormButton} from '../../components/FormButton';
import {AuthContext} from './AuthProvider';
import {background, textSecondary} from '../../components/colors';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Welcome to Urbanfit</Title>
      <FormInput
        labelName="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={userEmail => setEmail(userEmail)}
      />
      <FormInput
        labelName="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={userPassword => setPassword(userPassword)}
      />
      {error ? (
        <HelperText type="error" visible={Boolean(error)}>
          {error}
        </HelperText>
      ) : null}
      <View style={styles.buttonMargin}>
        <FormButton
          title="Login"
          modeValue="contained"
          labelStyle={styles.loginButtonLabel}
          onPress={() => login(email, password)}
        />
      </View>
      <FormButton
        title="New user? Join here"
        modeValue="text"
        uppercase={false}
        labelStyle={styles.registrationButtonText}
        onPress={() => navigation.navigate('Signup')}
      />
      <FormButton
        title="Forgot password?"
        modeValue="text"
        uppercase={false}
        labelStyle={styles.forgotPasswordButtonText}
        onPress={() => navigation.navigate('ForgotPassword')}
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
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  buttonMargin: {
    marginBottom: 16,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  registrationButtonText: {
    fontSize: 14,
  },
  forgotPasswordButtonText: {
    color: textSecondary,
    fontSize: 14,
  },
});
