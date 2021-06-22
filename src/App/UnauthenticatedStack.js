import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUpUserDetailsScreen from '../domains/auth/SignUpUserDetailsScreen';
import LoginScreen from '../domains/auth/LoginScreen';
import ForgotPasswordScreen from '../domains/auth/ForgotPasswordScreen';
import {NavBackButton} from '../components/NavBackButton';

const Stack = createStackNavigator();

export default function UnauthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        options={{
          headerTitle: null,
          headerRight: () => <NavBackButton />,
        }}
        name="SignupUserDetails"
        component={SignUpUserDetailsScreen}
      />
    </Stack.Navigator>
  );
}
