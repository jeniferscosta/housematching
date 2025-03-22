import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { getAuth, signInWithPhoneNumber, signInWithCredential, PhoneAuthProvider } from 'firebase/auth';
import firebase from '../../../firebaseConfig';
import commonStyles from '../../utils/commonStyles';

const OTPInputScreen = ({ navigation, route }: { navigation: NavigationProp<any>, route: any }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [selectedInputIndex, setSelectedInputIndex] = useState<number | null>(null);
    const [countdown, setCountdown] = useState(60);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const { verificationId, phoneNumber, fullName, email } = route.params;

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown: number) => {
                if (prevCountdown === 1) {
                    clearInterval(timer);
                    setIsResendDisabled(false);
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleVerifyOtp = async () => {
        try {
            const auth = getAuth(firebase);
            const otpCode = otp.join('');
            const credential = PhoneAuthProvider.credential(verificationId, otpCode);
            await signInWithCredential(auth, credential);

            // Save user information to the database
            const response = await fetch('http://localhost:3000/api/users/otp-verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, telephone: phoneNumber }),
            });

            if (!response.ok) {
                throw new Error('Failed to verify user');
            }

            navigation.navigate('LocationConfigStep1'); // Navigate to step 1 of location configuration upon successful OTP verification
        } catch (error) {
            Alert.alert('Error', (error as any).message);
        }
    };

    const handleResendCode = async () => {
        try {
            const auth = getAuth(firebase);
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber);
            setCountdown(60);
            setIsResendDisabled(true);
            Alert.alert('Success', 'OTP has been resent.');
        } catch (error) {
            Alert.alert('Error', (error as any).message);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    return (
        <View style={commonStyles.container}>
            <ImageBackground source={require('../../assets/Login/FormOTP.png')} style={commonStyles.background} resizeMode="cover">
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/back.png')} style={commonStyles.backButtonImage} />
                </TouchableOpacity>
                <Text style={commonStyles.title}>Enter the code</Text>
                <Text style={commonStyles.subtitle}>Enter the 4 digit code that we just sent to {email}</Text>
                <View style={commonStyles.otpContainer}>
                    {otp.map((digit, index) => (
                        <View key={index} style={commonStyles.otpBox}>
                            <Image source={require('../../assets/icons/otp-box.png')} style={commonStyles.otpBox} />
                            {selectedInputIndex === index && (
                                <Image source={require('../../assets/icons/otp-box-selected.png')} style={commonStyles.selectedOtpImage} />
                            )}
                            <TextInput
                                style={commonStyles.otpInput}
                                value={digit}
                                onChangeText={(value) => handleOtpChange(index, value)}
                                onFocus={() => setSelectedInputIndex(index)}
                                onBlur={() => setSelectedInputIndex(null)}
                                keyboardType="number-pad"
                                maxLength={1}
                            />
                        </View>
                    ))}
                </View>
                <Button title="Verify OTP" onPress={handleVerifyOtp} />
                <Text style={commonStyles.label}>Resend code in {countdown} seconds</Text>
                <TouchableOpacity onPress={handleResendCode} disabled={isResendDisabled}>
                    <Text style={[commonStyles.resendCode, isResendDisabled && commonStyles.disabled]}>Resend Code</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    resendCode: {
        color: '#1E90FF',
        marginTop: 20,
        textDecorationLine: 'underline',
    },
    disabled: {
        color: 'gray',
    },
});

export default OTPInputScreen;