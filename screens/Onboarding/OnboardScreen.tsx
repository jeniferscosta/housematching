// screens/OnboardScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet,Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnboardScreen = () => {
    const navigation = useNavigation();
            return (
        
                <ImageBackground source={require('../../assets/Onboarding/background.png').default} style={styles.background} resizeMode="contain">
                    <View style={styles.container}>
                        <Image source={require('../../assets/Onboarding/logo.png').default} style={styles.logo} />
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(['ProdTour1'])}>
                            <Image source={require('../../assets/Onboarding/button.png').default} style={styles.buttonImage} />
                        </TouchableOpacity>
                        <Text style={styles.version}>Version 1.0.0</Text>
                    </View>
                </ImageBackground>
            );
    // return <Image source={{uri: "https://plus.unsplash.com/premium_photo-1739844476608-6d4e22c38b68?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} }style={styles.logo}/>
    // return <Image source={require('../../assets/Onboarding/background.png').default }style={styles.logo}/>
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
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        height: 812,
    },
    logo: {
        width: 150,
        height: 150,
  
    },
    button: {
        marginBottom: 10,
    },
    buttonImage: {
        width: 233,
        height: 54,
        marginVertical:20,
    },
    version: {
        
        marginBottom: 40,
        fontSize: 12,
        color: '#fff',
    },
});

export default OnboardScreen;