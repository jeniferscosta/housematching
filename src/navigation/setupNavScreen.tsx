import React from 'react';
import { RootStackParamList } from './types';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import OnboardScreen from '../screens/Onboarding/OnboardScreen';
import ProdTour1 from '../screens/ProductTour/ProdTour1';
import ProdTour2 from '../screens/ProductTour/ProdTour2';
import ProdTour3 from '../screens/ProductTour/ProdTour3';
import LoginSocialScreen from '../screens/LoginScreen/LoginSocialScreen';
import loginSingIn from '../screens/LoginScreen/loginSignIn';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AccountSetupScreen from '../screens/AccountEdit/AccountSetupScreen';
import locationConfigScreen from '../screens/Location/LocationConfigStep1';
import LoginRegister from '../screens/LoginScreen/LoginRegister';
import UserInfoScreen from '../screens/AccountEdit/UserInfoScreen';
import UnderConstructionScreen from '../screens/HomeScreen/UnderConstructionScreen';
import PropertyDetails from '../screens/PropertyDetails/PropertyDetailsScreen';
import Notifications from '../screens/notification/NotificationsScreen';
import AIAgent from '../screens/aiAgent/AIAgentScreen';
import SalesPropertiesScreen from '../screens/HomeScreen/SalesPropertiesScreen'; 
import MessageChat from '../screens/message/MessageChat';
import AIAgentScreen from '../screens/aiAgent/AIAgentScreen';

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
                <Stack.Screen name="LoginSocialScreen" component={LoginSocialScreen} />
                <Stack.Screen name="loginSingIn" component={loginSingIn} />
                <Stack.Screen name="LoginRegister" component={LoginRegister} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="LocationConfigScreen" component={locationConfigScreen} />
                <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
                <Stack.Screen name="UnderConstructionScreen" component={UnderConstructionScreen} />
                <Stack.Screen name="PropertyDetailsScreen" component={PropertyDetails} />
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