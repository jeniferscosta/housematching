import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Geolocation from '@react-native-community/geolocation';
import OnboardScreen from './screens/Onboarding/OnboardScreen';

const Stack = createStackNavigator();

const App = () => {
  const [location, setLocation] = useState<GeoPosition | null>(null);

  const getLocation = () => {
	Geolocation.getCurrentPosition(
	  (position) => {
		setLocation(position);
	  },
	  (error) => {
		console.error(error);
	  },
	  { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
	);
  };

  useEffect(() => {
	getLocation();
  }, []);

  return (
	<NavigationContainer>
	  <Stack.Navigator initialRouteName="Onboard">
		<Stack.Screen name="Onboard" component={OnboardScreen} />
    
		{/* Add other screens here */}
	  </Stack.Navigator>
	</NavigationContainer>
  );
};

export default App;