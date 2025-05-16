import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider, DefaultTheme } from 'react-native-paper'; // Import DefaultTheme
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import GalleryScreen from './screens/GalleryScreen';
import PictureViewingScreen from './screens/PictureViewingScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const zooTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#606c38', // A nice green for primary elements
    accent: '#FFC107',  // A warm yellow/amber for accent
    background: '#1111', // A light khaki/sand color for background
    text: '#FEFAP',     // Dark text color
  },
};

function GalleryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{ headerShown: false, title: 'Animals' }} // Set title here as well
      />
      <Stack.Screen
        name="PictureView"
        component={PictureViewingScreen}
        options={{ title: 'View Animal' }} // Update title
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={zooTheme}> {/* Apply the zoo theme */}
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="GalleryTab"
            component={GalleryStack}
            options={{
              title: 'Animals', // More appropriate title
              tabBarIcon: ({ color, size }) => (
                <Icon name="paw" color={color} size={size} /> // Use a paw icon
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: 'My Profile', // More user-friendly title
              tabBarIcon: ({ color, size }) => (
                <Icon name="account-circle" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}