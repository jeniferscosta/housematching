export type RootStackParamList = {
    OnboardScreen: undefined;
    ProdTour1: undefined;
    ProdTour2: undefined;
    ProdTour3: undefined;
    AccountSetup: undefined;
    LoginSocialScreen: undefined;
    RegisterScreen: undefined;
    loginSignIn: undefined;
    LoginRegister: undefined;
    OTPInputScreen: { verificationId: string };
    LocationConfigStep1: undefined;
    AmenitiesConfigScreen: undefined;
    PropertySelectionScreen: undefined;
    UnderConstructionScreen: undefined;
    SalesPropertiesScreen: undefined;
    PropertyDetails: { propertyId: string };
    Notifications: undefined;
    AIAgent: undefined;
    MessageChat: undefined;
    UserInfoScreen: undefined;
    AccountSetupScreen: undefined;
    LoginSocialMedia: undefined;
    LoginSingIn: undefined;
    LocationConfigScreen: undefined;
    loginRegister: undefined;
    HomeScreen: undefined;
    AIAgentScreen: undefined;
    // Add other routes here as needed
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