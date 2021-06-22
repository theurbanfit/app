import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChooseSubscriptionScreen from '../domains/subscription/ChooseSubscriptionScreen';
import {IconButton, useTheme} from 'react-native-paper';
import UserSettingsScreen from '../domains/profile/UserSettingsScreen';
import {useNavigation} from '@react-navigation/native';

const Subscription = createStackNavigator();

export default function SubscriptionStack({}) {

  return (
    <Subscription.Navigator initialRouteName="Unsubscribed">
      <Subscription.Screen
        name="Choose your subscription"
        component={ChooseSubscriptionScreen}
        options={{
          headerRight: UserSettings,
        }}
      />
      <Subscription.Screen
        name="User Settings"
        component={UserSettingsScreen}
      />
    </Subscription.Navigator>
  );
}

const UserSettings = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <IconButton
      icon="cog"
      size={28}
      color={colors.secondary}
      onPress={() => navigation.navigate('User Settings')}
    />
  );
};
