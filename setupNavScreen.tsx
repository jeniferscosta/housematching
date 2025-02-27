import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import OnboardScreen from './screens/Onboarding/OnboardScreen';
import ProductTour1 from './screens/ProductTour/ProdTour1';
import ProductTour2 from './screens/ProductTour/ProdTour2';
import ProductTour3 from './screens/ProductTour/ProdTour3';
import LoginSocialMedia from './screens/LoginScreen/LoginSocialScreen';
import LoginDetailsMailPass from './screens/LoginScreen/loginDetailsMailPass';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import { RootStackParamList } from './types';
import AccountSetupScreen from './screens/AccountSetup/AccountSetupScreen';
import commonStyles from './utils/commonStyles';
import { ImageBackground, TouchableOpacity } from 'react-native';   
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from './firebaseConfig';
import locationConfigScreen from './screens/Location/LocationConfigScreen';

import App from './App';

const Stack = createStackNavigator();

const SetupNavScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="OnboardScreen">
                <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
                <Stack.Screen name="ProductTour1" component={ProductTour1} />
                <Stack.Screen name="ProductTour2" component={ProductTour2} />
                <Stack.Screen name="ProductTour3" component={ProductTour3} />
                <Stack.Screen name="AccountSetupScreen" component={AccountSetupScreen} />
                <Stack.Screen name="LoginSocialMedia" component={LoginSocialMedia} />
                <Stack.Screen name="LoginDetailsMailPass" component={LoginDetailsMailPass} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="LocationConfigScreen" component={locationConfigScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default SetupNavScreen;