import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Geolocation from '@react-native-community/geolocation';
import OnboardScreen from './screens/Onboarding/OnboardScreen';
import ProdTour1 from './screens/ProductTour/ProdTour1'; // Import the ProdTour1 screen
import ProdTour2 from './screens/ProductTour/ProdTour2'; // Import the ProdTour2 screen
import ProdTour3 from './screens/ProductTour/ProdTour3'; // Import the ProdTour2 screen
import LoginSocialMedia from './screens/LoginScreen/LoginSocialScreen';
import loginDetailsMailPass from './screens/LoginScreen/loginDetailsMailPass';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import { GeoPosition } from './types';
import { RootStackParamList } from './types';
import AccountSetupScreen from './screens/AccountSetup/AccountSetupScreen';
import LocationConfigScreen from './screens/Location/LocationConfigScreen';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [location, setLocation] = useState<GeoPosition | null>(null);

  const getLocation = () => {
	Geolocation.getCurrentPosition(
	  (position) => {
		setLocation({
		  latitude: position.coords.latitude,
		  longitude: position.coords.longitude,
		});
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

  const position: GeoPosition = {
	latitude: 37.7749,
	longitude: -122.4194,
  };

  return (
	<NavigationContainer>
	  <Stack.Navigator initialRouteName="OnboardScreen">
		<Stack.Screen name="OnboardScreen" component={OnboardScreen} />
		<Stack.Screen name="ProdTour1" component={ProdTour1} />
		<Stack.Screen name="ProdTour2" component={ProdTour2} />
		<Stack.Screen name="ProdTour3" component={ProdTour3} />
		<Stack.Screen name="AccountSetupScreen" component={AccountSetupScreen} />
		<Stack.Screen name="loginDetailsMailPass" component={loginDetailsMailPass} />
		<Stack.Screen name="LoginSocialScreen" component={LoginSocialMedia} />
		<Stack.Screen name="HomeScreen" component={HomeScreen} />
		<Stack.Screen name="locationConfigScreen" component={LocationConfigScreen}/>
		{/* Add other screens here */}
	  </Stack.Navigator>
	  <div>
		<h1>GeoPosition</h1>
		<p>Latitude: {position.latitude}</p>
		<p>Longitude: {position.longitude}</p>
	  </div>
	</NavigationContainer>
  );
};

export default App;