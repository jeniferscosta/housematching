// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PropertyDetailsScreen from './screens/PropertyDetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import LoginScreen from './screens/LoginScreen'; // Import the LoginScreen
import AccountSetupScreen from './screens/AccountSetupScreen'; // Import the AccountSetupScreen
import LocationScreen from './LocationScreen';
import MapScreen from './screens/MapScreen'; // Import the new screen
import StateTypeScreen from './StateTypeScreen';
import PropertyFeaturesScreen from './PropertyFeaturesScreen';


const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login"> {/* Set initial route to Login */}
            <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
                <Stack.Screen name="Favorites" component={FavoritesScreen} />
                <Stack.Screen name="AccountSetup" component={AccountSetupScreen} />
                <Stack.Screen name="Location" component={LocationScreen} />
                <Stack.Screen name="MapScreen" component={MapScreen} />
                <Stack.Screen name="StateType" component={StateTypeScreen} />
                <Stack.Screen name="PropertyFeatures" component={PropertyFeaturesScreen} />
                {/* Add your new screen here */}
                <Stack.Screen name="YourNewScreen" component={YourNewScreenComponent} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;