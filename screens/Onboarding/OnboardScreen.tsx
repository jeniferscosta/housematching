// screens/OnboardScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

const OnboardScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <ImageBackground source={require('../../assets/Onboarding/background.png').default} style={styles.background} resizeMode="contain">
            <View style={styles.container}>
                <Image source={require('../../assets/Onboarding/logo.png').default} style={styles.logo} />
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProdTour1")}>
                    <Image source={require('../../assets/Onboarding/button.png').default} style={styles.buttonImage} />
                </TouchableOpacity>
                <Text style={styles.version}>Version 1.0.0</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 375,
        height: 812,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 200, // Add some padding to the top and bottom
    },
    logo: {
        width: 190,
        height: 200,
        marginTop: 50, // Add some margin to the top
    },
    button: {
        marginVertical: 180, // Add vertical margin to position the button between the logo and version text
    },
    buttonImage: {
        width: 170,
        height: 40,
    },
    version: {
        fontSize: 12,
        color: '#fff',
    },
});

export default OnboardScreen;