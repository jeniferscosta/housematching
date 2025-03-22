import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import OnboardScreen from '../screens/Onboarding/OnboardScreen';
import ProdTour1 from '../screens/ProductTour/ProdTour1';
import ProdTour2 from '../screens/ProductTour/ProdTour2';
import ProdTour3 from '../screens/ProductTour/ProdTour3';
import LoginSocialScreen from '../screens/LoginScreen/LoginSocialScreen';
import loginSingIn from '../screens/LoginScreen/loginSignIn';
import LoginRegister from '../screens/LoginScreen/LoginRegister';
import AccountSetupScreen from '../screens/AccountEdit/AccountSetupScreen';
import UnderConstructionScreen from '../screens/HomeScreen/UnderConstructionScreen';
import PropertyDetailsScreen from '../screens/PropertyDetails/PropertyDetailsScreen';
import Notifications from '../screens/notification/NotificationsScreen';
import AIAgent from '../screens/aiAgent/AIAgentScreen';
import AIAgentScreen from '../screens/aiAgent/AIAgentScreen';
import SalesPropertiesScreen from '../screens/HomeScreen/SalesPropertiesScreen'; 
import MessageChat from '../screens/message/MessageChat';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import locationConfigScreen from '../screens/Location/LocationConfigStep1';
import UserInfoScreen from '../screens/AccountEdit/UserInfoScreen';


const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardScreen">
        <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
        <Stack.Screen name="AccountSetupScreen" component={AccountSetupScreen} />
        <Stack.Screen name="ProdTour1" component={ProdTour1} />
        <Stack.Screen name="ProdTour2" component={ProdTour2} />
        <Stack.Screen name="ProdTour3" component={ProdTour3} />
        <Stack.Screen name="LoginSocialScreen" component={LoginSocialScreen} />
        <Stack.Screen name="loginSingIn" component={loginSingIn} />
        <Stack.Screen name="LoginRegister" component={LoginRegister} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LocationConfigScreen" component={locationConfigScreen} />
        <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
        <Stack.Screen name="UnderConstructionScreen" component={UnderConstructionScreen} />
        <Stack.Screen name="PropertyDetailsScreen" component={PropertyDetailsScreen} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="AIAgent" component={AIAgent} />
        <Stack.Screen name="SalesPropertiesScreen" component={SalesPropertiesScreen} />
        <Stack.Screen name="MessageChat" component={MessageChat} />
        <Stack.Screen name="AIAgentScreen" component={AIAgentScreen} />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;