import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    OnboardScreen: undefined;
    ProdTour1: undefined;
    ProdTour2: undefined;
    ProdTour3: undefined;
    AccountSetupScreen: undefined;
    LoginSocialScreen: undefined;
    loginSingIn: undefined;
    LoginRegister: undefined;
    HomeScreen: undefined;
    LocationConfigScreen: undefined;
    UserInfoScreen: undefined;
    UnderConstructionScreen: undefined;
    PropertyDetailsScreen: { propertyId: string };
    Notifications: undefined;
    AIAgent: undefined;
    SalesPropertiesScreen: undefined;
    MessageChat: undefined;
    AIAgentScreen: undefined;
    loginSignIn: undefined;
    OTPInputScreen: undefined;
    // Add other routes here as needed
};

type ScreenRouteProp<Screen extends keyof RootStackParamList> = RouteProp<RootStackParamList, Screen>;
type ScreenNavigationProp<Screen extends keyof RootStackParamList> = StackNavigationProp<RootStackParamList, Screen>;

export type ScreenProps<Screen extends keyof RootStackParamList> = {
  route: ScreenRouteProp<Screen>;
  navigation: ScreenNavigationProp<Screen>;
};

export interface GeoPosition {
    latitude: number;
    longitude: number;
}

// Define other types and interfaces as needed
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface House {
  id: string;
  address: string;
  price: number;
  description: string;
  // Add other properties as needed
}
