import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

const OnboardScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <ImageBackground source={require('../../assets/Onboarding/background.png')} style={styles.background} resizeMode="cover">
            <View style={styles.container}>
                <Image source={require('../../assets/Onboarding/logo.png')} style={styles.logo} />
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate("ProdTour1")}
                    accessibilityLabel="Start Product Tour"
                >
                    <Image source={require('../../assets/Onboarding/button.png')} style={styles.buttonImage} />
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
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '20%', 
    },
    logo: {
        width: 190,
        height: 200,
        marginTop: '10%', 
    },
    button: {
        marginVertical: '20%', 
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