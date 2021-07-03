import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '../domains/auth/SignUpScreen';
import LoginScreen from '../domains/auth/LoginScreen';
import ForgotPasswordScreen from '../domains/auth/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function UnauthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
