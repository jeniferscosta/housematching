import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OnboardScreen from './OnboardScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { expect, test, jest } from '@jest/globals';

// Define the route parameters
type RootStackParamList = {
    Onboard: undefined;
};

// Create a Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

function MockNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboard">
                <Stack.Screen name="Onboard" component={OnboardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: jest.fn(),
    };
});

test('renders correctly and navigates on button press', () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });

    const { getByText, getByLabelText } = render(<MockNavigator />);

    // Check if the version text is rendered
    expect(getByText('Version 1.0.0')).toBeTruthy();

    // Check if the button is rendered and press it
    const button = getByLabelText('Start Product Tour');
    fireEvent.press(button);

    // Add more assertions as needed
    expect(mockNavigate).toHaveBeenCalledWith('NextScreen'); // Replace 'NextScreen' with the actual screen name
});
