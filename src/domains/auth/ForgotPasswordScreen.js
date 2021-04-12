import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, IconButton, HelperText, Snackbar} from 'react-native-paper';
import {FormInput} from '../../components/FormInput';
import {FormButton} from '../../components/FormButton';
import {AuthContext} from './AuthProvider';
import {Formik} from 'formik';
import * as Yup from 'yup';

export default function ForgotPasswordScreen({navigation}) {
  const [snackbarVisible, setSnackbarVisibility] = useState(false);
  const {passwordReset} = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .email('Enter a valid email')
      .required('Please enter a registered email'),
  });

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Forgot password?</Title>
      <Formik
        initialValues={{email: ''}}
        onSubmit={({email}) => {
          passwordReset(email);
          setSnackbarVisibility(true);
        }}
        validationSchema={validationSchema}>
        {({
          handleChange,
          values: {email},
          handleSubmit,
          errors,
          isValid,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <>
            <FormInput
              labelName="Email"
              value={email}
              autoCapitalize="none"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {touched.email && errors.email ? (
              <HelperText type="error" visible={Boolean(errors.email)}>
                {errors.email}
              </HelperText>
            ) : null}

            <FormButton
              title="Send Email"
              modeValue="contained"
              onPress={handleSubmit}
              labelStyle={styles.loginButtonLabel}
              disabled={!isValid || isSubmitting}
            />
          </>
        )}
      </Formik>

      <IconButton
        icon="keyboard-backspace"
        size={30}
        style={styles.navButton}
        color="#6646ee"
        onPress={() => navigation.navigate('Login')}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => {
          setSnackbarVisibility(false);
          navigation.navigate('Login');
        }}
        action={{
          label: 'Return',
          onPress: () => setSnackbarVisibility(false),
        }}>
        Email successfully sent. Return to login page.
      </Snackbar>
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
