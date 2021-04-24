import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, HelperText, Colors} from 'react-native-paper';
import {FormInput} from '../../components/FormInput';
import {FormButton} from '../../components/FormButton';
import {AuthContext} from './AuthProvider';

export default function LoginScreen({navigation}) {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, setError, error} = useContext(AuthContext);

  const handleLogin = async () => {
    if (email.length && password.length) {
      setLoading(true);
      await login(email, password, () => setLoading(false));
    } else {
      setLoading(false);
      setError('All values are required');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Welcome to Urbanfit</Title>
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
      {error ? (
        <HelperText type="error" visible={Boolean(error)}>
          {error}
        </HelperText>
      ) : null}
      <View style={styles.buttonMargin}>
        <FormButton
          loading={loading}
          disabled={loading}
          title="Login"
          modeValue="contained"
          labelStyle={styles.loginButtonLabel}
          onPress={handleLogin}
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
    backgroundColor: Colors.background,
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
    margin: 12,
    fontSize: 22,
  },
  registrationButtonText: {
    fontSize: 14,
  },
  forgotPasswordButtonText: {
    color: Colors.textLight,
    fontSize: 14,
  },
});
