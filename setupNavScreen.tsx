import React from 'react';
import { RootStackParamList } from './types';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import OnboardScreen from './screens/Onboarding/OnboardScreen';
import ProdTour1 from './screens/ProductTour/ProdTour1';
import ProdTour2 from './screens/ProductTour/ProdTour2';
import ProdTour3 from './screens/ProductTour/ProdTour3';
import LoginSocialMedia from './screens/LoginScreen/LoginSocialScreen';
import LoginSingIn from './screens/LoginScreen/loginSignIn';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import AccountSetupScreen from './screens/AccountSetup/AccountSetupScreen';
import locationConfigScreen from './screens/Location/LocationConfigScreen';
import loginRegister from './screens/LoginScreen/LoginRegister';
import UserInfoScreen from './screens/UserInfo/UserInfoScreen';
import UnderConstructionScreen from './screens/HomeScreen/UnderConstructionScreen';
import PropertyDetails from './screens/HomeScreen/PropertyDetails';
import Notifications from './screens/Notifications/Notifications';
import AIAgent from './screens/AIAgent/AIAgent';
import SalesPropertiesScreen from './screens/HomeScreen/SalesPropertiesScreen'; 
import MessageChat from './screens/MessageChat/MessageChat';
import AIAgentScreen from './screens/AIAgent/AIAgentScreen';

const Stack = createStackNavigator<RootStackParamList>();

const SetupNavScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="OnboardScreen">
                <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
                <Stack.Screen name="ProdTour1" component={ProdTour1} />
                <Stack.Screen name="ProdTour2" component={ProdTour2} />
                <Stack.Screen name="ProdTour3" component={ProdTour3} />
                <Stack.Screen name="AccountSetupScreen" component={AccountSetupScreen} />
                <Stack.Screen name="LoginSocialMedia" component={LoginSocialMedia} />
                <Stack.Screen name="LoginSingIn" component={LoginSingIn} />
                <Stack.Screen name="loginRegister" component={loginRegister} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="LocationConfigScreen" component={locationConfigScreen} />
                <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
                <Stack.Screen name="UnderConstructionScreen" component={UnderConstructionScreen} />
                <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
                <Stack.Screen name="Notifications" component={Notifications} />
                <Stack.Screen name="AIAgent" component={AIAgent} />
                <Stack.Screen name="SalesPropertiesScreen" component={SalesPropertiesScreen} />
                <Stack.Screen name="MessageChat" component={MessageChat} />
                <Stack.Screen name="AIAgentScreen" component={AIAgentScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default SetupNavScreen;