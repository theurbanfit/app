import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Title, HelperText, useTheme} from 'react-native-paper';
import {FormInput} from '../../components/FormInput';
import {FormButton} from '../../components/FormButton';
import {AuthContext} from './AuthProvider';
import {NavBackButton} from '../../components/NavBackButton';

export default function SignUpUserDetailsScreen({navigation}) {
  const {styles} = useStyles();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const {register, setError, error} = useContext(AuthContext);

  useEffect(() => setLoading(false), []);

  debugger
  return (
    <SafeAreaView style={styles.container}>
      <NavBackButton onNavigate={navigation.goBack} />
      <View style={styles.registrationFormContainer}>
        <Title style={styles.titleText}>Register on Urbanfit</Title>
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
      </View>
      <View style={styles.surface}>
        <FormButton
          title="Continue"
          modeValue="contained"
          onPress={async () => {
            if (
              email.length &&
              password.length &&
              firstName.length &&
              lastName.length
            ) {
              setLoading(true);
              await register(
                {
                  email,
                  password,
                  firstName,
                  lastName,
                },
                () => setLoading(false),
              );
            } else {
              setError('All values are required');
            }
          }}
          loading={loading}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const useStyles = () => {
  const {colors} = useTheme();

  return {
    theme: {colors},
    styles: StyleSheet.create({
      container: {
        backgroundColor: colors.background,
        flex: 1,
      },
      registrationFormContainer: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
      },
      surface: {
        flex: 0.1,
        borderTopColor: colors.divider,
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      titleText: {
        color: colors.secondary,
        fontSize: 24,
        marginBottom: 10,
      },
      navButtonText: {
        fontSize: 18,
      },
      navButton: {
        marginTop: 10,
      },
    }),
  };
};
