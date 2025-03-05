import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, Image, TextInput, Alert, View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import commonStyles from '../../utils/commonStyles';
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import firebase from '../../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginDetailsMailPass = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        try {
            const auth = getAuth(firebase);
            await signInWithEmailAndPassword(auth, email, password);

            // Save user information to the database
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to log in user');
            }

            navigation.navigate("LocationConfigStep1");
        } catch (error) {
            setErrorMessage((error as any).message);
        }
    };

    /*Sign-in when the user has an account previously created*/
    return (
        <View style={commonStyles.container}>
            <ImageBackground source={require('../../assets/Login/FormLoginEmpty.png')} style={commonStyles.background} resizeMode="cover" onError={(error) => console.log(error)}>
                <TouchableOpacity style={commonStyles.skipButton} onPress={() => navigation.navigate("AccountSetupScreen")}>
                </TouchableOpacity>
                <TextInput
                    style={commonStyles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={commonStyles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Text style={commonStyles.showPassword}>{isPasswordVisible ? 'Hide Password' : 'Show Password'}</Text>
                </TouchableOpacity>
                {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}
                <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
                    <Text style={commonStyles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.button, styles.nextButton]} onPress={handleLogin}>
                    <Image source={require('../../assets/Login/LoginBtnGreen.png')} style={styles.image} />
                    <Text style={commonStyles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.button, styles.nextButton]} onPress={() => navigation.navigate("LocationConfigScreen")}>
                    <Image source={require('../../assets/Login/google.png')} style={styles.image} />
                    <Text style={commonStyles.buttonText}>GoogleAuthProvider={}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.button, styles.nextButton]} onPress={() => navigation.navigate("LocationConfigScreen")}>
                    <Image source={require('../../assets/Login/FB.png')} style={styles.image} />
                    <Text style={commonStyles.buttonText}>FacebookAuthProvider={}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
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
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default LoginDetailsMailPass;