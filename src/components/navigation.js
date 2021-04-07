import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/home';
import CategoriesScreen from '../screens/categories';
import SettingsScreen from '../screens/settings';
import BookmarkScreen from '../screens/bookmark';
import SinglePost from '../screens/singlePost';
import CategoriesList from '../screens/categorieList';
import Feedback from '../screens/feedback';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SinglePost" component={SinglePost} />
    </Stack.Navigator>
  );
}

function BookmarkStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bookmark" component={BookmarkScreen} />
      <Stack.Screen name="SinglePost" component={SinglePost} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Setting" component={SettingsScreen} />
      <Stack.Screen name="Feedback" component={Feedback} />
    </Stack.Navigator>
  );
}

function CategoriesStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="CategoriesList" component={CategoriesList} />
      <Stack.Screen name="SinglePost" component={SinglePost} />
    </Stack.Navigator>
  );
}

const Navigator = () => {
  const Tab = createBottomTabNavigator();
  Icon.loadFont();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Bookmark') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            } else if (route.name === 'Categories') {
              iconName = focused ? 'apps' : 'apps-box';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-box';
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Categories" component={CategoriesStack} />
        <Tab.Screen name="Bookmark" component={BookmarkStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
