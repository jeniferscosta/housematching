import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';
import firebase from '../../firebaseConfig';
import commonStyles from '../../utils/commonStyles';

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telephone, setTelephone] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleRegister = async () => {
        if (!fullName || !email || !password || !telephone) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        try {
            const auth = getAuth(firebase);
            const confirmationResult = await signInWithPhoneNumber(auth, telephone);

            // Save user information to the database
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, password, telephone }),
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }

            navigation.navigate('OTPInputScreen', { verificationId: confirmationResult.verificationId, phoneNumber: telephone });
        } catch (error) {
            Alert.alert('Error', (error as any).message);
        }
    };

    return (
        <View style={commonStyles.container}>
            <ImageBackground source={require('../../assets/Login/createAccount.png')} style={commonStyles.background} />
            <Text style={commonStyles.label}>Full Name</Text>
            <TextInput
                style={commonStyles.input}
                value={fullName}
                onChangeText={setFullName}
            />
            <Text style={commonStyles.label}>E-mail</Text>
            <TextInput
                style={commonStyles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={commonStyles.label}>Password</Text>
            <TextInput
                style={commonStyles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
            />
            <Text style={commonStyles.label}>Telephone</Text>
            <TextInput
                style={commonStyles.input}
                value={telephone}
                onChangeText={setTelephone}
                keyboardType="phone-pad"
            />
            <TouchableOpacity onPress={() => navigation.navigate('TermsAndConditions')}>
                <Text style={commonStyles.termsConditions}>Terms and Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePasswordVisibility}>
                <Text style={commonStyles.showPassword}>{isPasswordVisible ? 'Hide Password' : 'Show Password'}</Text>
            </TouchableOpacity>
            <Button title="Register" onPress={handleRegister} />
            <Image source={require('../../assets/Login/RegisterBtn.png')} style={commonStyles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
});

export default LoginScreen;