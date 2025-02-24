// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardScreen from '../screens/Onboarding/OnboardScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen'; // Assuming you have a HomeScreen

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
	<NavigationContainer>
	  <Stack.Navigator initialRouteName="Onboard">
		<Stack.Screen name="Onboard" component={OnboardScreen} />
		<Stack.Screen name="Home" component={HomeScreen} />
	  </Stack.Navigator>
	</NavigationContainer>
  );
};

export default AppNavigator;