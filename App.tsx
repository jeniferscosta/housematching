import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { Marker } from 'react-native-maps';
import OnboardScreen from './screens/Onboarding/OnboardScreen';
import ProdTour1 from './screens/ProductTour/ProdTour1';
import ProdTour2 from './screens/ProductTour/ProdTour2';
import ProdTour3 from './screens/ProductTour/ProdTour3';
import LoginSocialMedia from './screens/LoginScreen/LoginSocialScreen';
import LoginSignIn from './screens/LoginScreen/loginSignIn';
import LoginRegister from './screens/LoginScreen/LoginRegister';
import OTPInputScreen from './screens/LoginScreen/OTPInputScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import AccountSetupScreen from './screens/AccountEdit/AccountSetupScreen';
import UserInfoScreen from './screens/AccountEdit/UserInfoScreen'; 
import LocationConfigScreen from './screens/Location/LocationConfigStep1';
import PropertySelectionScreen from './screens/PropertyAmenitiesScreen/PropertySelectionScreen';
import AmenitiesConfigScreen from './screens/PropertyAmenitiesScreen/AmenitiesConfigScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardScreen">
        <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
        <Stack.Screen name="ProdTour1" component={ProdTour1} />
        <Stack.Screen name="ProdTour2" component={ProdTour2} />
        <Stack.Screen name="ProdTour3" component={ProdTour3} />
        <Stack.Screen name="AccountSetupScreen" component={AccountSetupScreen} />
        <Stack.Screen name="LoginSocialScreen" component={LoginSocialMedia} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LocationConfigScreen" component={LocationConfigScreen} />
        <Stack.Screen name="LoginSignIn" component={LoginSignIn} />
        <Stack.Screen name="LoginRegister" component={LoginRegister} />
        <Stack.Screen name="OTPInputScreen" component={OTPInputScreen} />
        <Stack.Screen name="PropertySelectionScreen" component={PropertySelectionScreen} />
        <Stack.Screen name="AmenitiesConfigScreen" component={AmenitiesConfigScreen} />
        {/* Add other screens here */}
      </Stack.Navigator>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title={"Marker Title"}
          description={"Marker Description"}
        />
      </MapView>
    </NavigationContainer>
  );
};

export default App;