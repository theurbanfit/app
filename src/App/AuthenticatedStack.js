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
import {IconButton, useTheme} from 'react-native-paper';
import AvailableScannedEventsScreen from '../domains/checkIn/AvailableScannedEventsScreen';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Profile = createStackNavigator();
const CheckIn = createStackNavigator();

function CheckInStackScreen() {
  return (
    <CheckIn.Navigator>
      <CheckIn.Screen name="Check in" component={CheckInScreen} />
    </CheckIn.Navigator>
  );
}

function ProfileStackScreen({navigation}) {
  const {colors} = useTheme();

  return (
    <Profile.Navigator>
      <Profile.Screen
        options={{
          headerTitle: null,
          headerRight: () => (
            <IconButton
              icon="cog-outline"
              size={28}
              color={colors.secondary400}
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
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
      }}>
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
        component={CheckInStackScreen}
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
    <Stack.Navigator
      initialRouteName="Authenticated"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ActivityFeed" component={BottomTabNavigation} />
      <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen} />
      <Stack.Screen
        name="Available Scanned Events"
        component={AvailableScannedEventsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Events',
        }}
      />
    </Stack.Navigator>
  );
}
