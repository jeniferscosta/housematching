import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductTour1 from './screens/ProductTour/ProdTour1';
import ProductTour2 from './screens/ProductTour/ProdTour2';
import ProductTour3 from './screens/ProductTour/ProdTour3';
import OnboardScreen from './screens/Onboarding/OnboardScreen'; 
import LoginScreen from './screens/LoginScreen/LoginScreen';
import LoginSocialMedia from './screens/LoginScreen/LoginSocialScreen';
import loginDetailsMailPass from './screens/LoginScreen/loginDetailsMailPass';
import HomeScreen from './screens/HomeScreen/HomeScreen';

const Stack = createStackNavigator();

const SetupNavScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="OnboardScreen">
                <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
                <Stack.Screen name="ProductTour1" component={ProductTour1} />
                <Stack.Screen name="ProductTour2" component={ProductTour2} />
                <Stack.Screen name="ProductTour3" component={ProductTour3} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="LoginSocialMedia" component={LoginSocialMedia} />
                <Stack.Screen name="loginDetailsMailPass" component={loginDetailsMailPass} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default SetupNavScreen;