import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from '../screens/Onboarding/OnboardScreen'; // Update the import path

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardScreen"> {/* Update this line */}
        <Stack.Screen name="OnboardScreen" component={Onboarding} /> {/* Update this line */}
        {/* ...existing routes... */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;