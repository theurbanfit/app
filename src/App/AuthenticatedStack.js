import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ActivitiesScreen from '../domains/activities/ActivitiesScreen';
import UserProfileScreen from '../domains/userProfile/UserProfileScreen';
import FontCommunityIcons from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import CheckInScreen from '../domains/checkIn/CheckInScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={ActivitiesScreen}
        options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="sports-handball"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Check=in"
        component={CheckInScreen}
        options={{
          tabBarLabel: 'Check-in',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="qr-code-scanner"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <FontCommunityIcons name="user-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
