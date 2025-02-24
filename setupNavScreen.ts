// App.js
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.tsx.tsx';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PropertyDetailsScreen from './screens/PropertyDetailsScreen';
// App.js

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
                {/* Add your new screen here */}
                <Stack.Screen name="YourNewScreen" component={YourNewScreenComponent} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;