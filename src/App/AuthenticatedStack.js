import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ActivityFeedScreen from '../domains/activities/ActivityFeedScreen';
import UserProfileScreen from '../domains/userProfile/UserProfileScreen';
import FontCommunityIcons from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import CheckInScreen from '../domains/checkIn/CheckInScreen';
import ActivityDetailsScreen from '../domains/activities/ActivityDetailsScreen';

const Tab = createBottomTabNavigator();
const ActivityStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <ActivityStack.Navigator initialRouteName="Activities" headerMode="none">
      <ActivityStack.Screen
        name="ActivityFeed"
        component={ActivityFeedScreen}
      />
      <ActivityStack.Screen
        name="ActivityDetails"
        component={ActivityDetailsScreen}
      />
    </ActivityStack.Navigator>
  );
};

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Activity feed"
        component={MainStackNavigator}
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
