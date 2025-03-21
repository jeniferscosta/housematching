import React from 'react';
import { RootStackParamList } from './types';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import OnboardScreen from './src/screens/Onboarding/OnboardScreen';
import ProdTour1 from './src/screens/ProductTour/ProdTour1';
import ProdTour2 from './src/screens/ProductTour/ProdTour2';
import ProdTour3 from './src/screens/ProductTour/ProdTour3';
import LoginSocialMedia from './src/screens/LoginScreen/LoginSocialScreen';
import LoginSingIn from './src/screens/LoginScreen/loginSignIn';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import AccountSetupScreen from './src/screens/AccountEdit/AccountSetupScreen';
import locationConfigScreen from './src/screens/Location/LocationConfigStep1';
import loginRegister from './src/screens/LoginScreen/LoginRegister';
import UserInfoScreen from './src/screens/AccountEdit/UserInfoScreen';
import UnderConstructionScreen from './src/screens/HomeScreen/UnderConstructionScreen';
import PropertyDetails from './src/screens/PropertyDetails/PropertyDetailsScreen';
import Notifications from './src/screens/notification/NotificationsScreen';
import AIAgent from './src/screens/aiAgent/AIAgentScreen';
import SalesPropertiesScreen from './src/screens/HomeScreen/SalesPropertiesScreen'; 
import MessageChat from './src/screens/message/MessageChat';

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