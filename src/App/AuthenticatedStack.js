import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../domains/home/HomeScreen';
import UserProfileScreen from '../domains/userProfile/UserProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}
