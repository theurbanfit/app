import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ActivityFeedScreen from '../domains/activities/ActivityFeedScreen';
import UserProfileScreen from '../domains/profile/UserProfileScreen';
import FontCommunityIcons from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import CheckInScreen from '../domains/checkIn/CheckInScreen';
import ActivityDetailsScreen from '../domains/activities/ActivityDetailsScreen';
import UserSettingsScreen from '../domains/profile/UserSettings';
import {IconButton} from 'react-native-paper';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Profile = createStackNavigator();

function ProfileStackScreen({navigation}) {
  return (
    <Profile.Navigator>
      <Profile.Screen
        options={{
          headerTitle: null,
          headerRight: () => (
            <IconButton
              icon="cog-outline"
              size={28}
              onPress={() => navigation.navigate('User Settings')}
            />
          ),
        }}
        name="Profile"
        component={UserProfileScreen}
      />
      <Profile.Screen name="User Settings" component={UserSettingsScreen} />
    </Profile.Navigator>
  );
}
function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Activity feed"
        component={ActivityFeedScreen}
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
        component={ProfileStackScreen}
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

export default function AuthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="Authenticated" headerMode="none">
      <Stack.Screen name="ActivityFeed" component={BottomTabNavigation} />
      <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen} />
    </Stack.Navigator>
  );
}
