import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import commonStyles from '../../utils/commonStyles';
import { getAuth, FacebookAuthProvider, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import firebase from '../../../firebaseConfig';

const LoginSocialScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const auth = getAuth(firebase);
            await signInWithRedirect(auth, provider);
            const user = auth.currentUser;

            if (user) {
                // Save user information to the database
                const response = await fetch('http://localhost:3000/api/users/social-login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fullName: user.displayName, email: user.email }),
                });

                if (!response.ok) {
                    throw new Error('Failed to log in user');
                }

                navigation.navigate("AccountSetupScreen");
            }
        } catch (error) {
            Alert.alert('Login Error', (error as any).message);
        }
    };

    const handleFacebookLogin = async () => {
        const provider = new FacebookAuthProvider();
        try {
            const auth = getAuth(firebase);
            await signInWithRedirect(auth, provider);
            const user = auth.currentUser;

            if (user) {
                // Save user information to the database
                const response = await fetch('http://localhost:3000/api/users/social-login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fullName: user.displayName, email: user.email }),
                });

                if (!response.ok) {
                    throw new Error('Failed to log in user');
                }

                navigation.navigate("AccountSetupScreen");
            }
        } catch (error) {
            Alert.alert('Login Error', (error as any).message);
        }
    };

    return (
        <View style={commonStyles.container}>
            <ImageBackground source={require('../../assets/Login/LoginSocialMedia.png')} style={commonStyles.background} resizeMode="cover" onError={(error) => console.log(error)}>
                <TouchableOpacity style={commonStyles.skipButton} onPress={() => navigation.navigate("loginSignIn")}>
                    <Image source={require('../../assets/Login/btngreen-contwithemail.png')} style={styles.image} />
                    <Text style={commonStyles.buttonText}>Continue with e-mail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.button, styles.nextButton]} onPress={handleGoogleLogin}>
                    <Image source={require('../../assets/Login/google.png')} style={styles.image} />
                    <Text style={commonStyles.buttonText}>Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.button, styles.nextButton]} onPress={handleFacebookLogin}>
                    <Image source={require('../../assets/Login/FB.png')} style={styles.image} />
                    <Text style={commonStyles.buttonText}>Continue with Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("loginSignIn")}>
                    <Text style={commonStyles.registerButton}>Don’t have an account? Register</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    nextButton: {
        backgroundColor: '#8BC83F',
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 20,
    },
});

export default LoginSocialScreen;