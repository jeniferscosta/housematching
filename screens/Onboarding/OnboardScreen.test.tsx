import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OnboardScreen from './OnboardScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Define the route parameters
type RootStackParamList = {
    Onboard: undefined;
};

// Create a Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

function MockNavigator() {
    return (
        <NavigationContainer screenOptions={{ headerShown: false }}>
            <Stack.Navigator>
                <Stack.Screen name="Onboard" component={OnboardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

test('renders correctly and navigates on button press', () => {
    const { getByText, getByLabelText } = render(<MockNavigator />);

    // Check if the version text is rendered
    expect(getByText('Version 1.0.0')).toBeTruthy();

    // Check if the button is rendered and press it
    const button = getByLabelText('Start Product Tour');
    fireEvent.press(button);

    // Add more assertions as needed
});
