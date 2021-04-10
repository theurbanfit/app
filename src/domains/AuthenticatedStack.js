import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './home/HomeScreen';
import UserSettingsScreen from './userSettings/UserSettingsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={UserSettingsScreen} />
    </Tab.Navigator>
  );
}
