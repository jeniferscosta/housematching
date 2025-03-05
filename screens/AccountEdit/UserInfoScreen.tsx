import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import commonStyles from '../../utils/commonStyles';

const UserInfoScreen = ({ navigation, route }: { navigation: NavigationProp<any>, route: any }) => {
    const { email } = route.params;
    const [fullName, setFullName] = useState('');
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfilePicture(result.uri);
        }
    };

    const handleFinish = async () => {
        try {
            // Save user information to the database
            const response = await fetch('http://localhost:3000/api/users/save-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, profilePicture }),
            });

            if (!response.ok) {
                throw new Error('Failed to save user information');
            }

            // Navigate to the home page
            navigation.navigate('HomeScreen');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={commonStyles.container}>
            <View style={commonStyles.header}>
                <TouchableOpacity style={commonStyles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/back.png')} style={commonStyles.backButtonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.skipButton} onPress={() => navigation.navigate('HomeScreen')}>
                    <Image source={require('../../assets/icons/skip.png')} style={commonStyles.skipButtonImage} />
                </TouchableOpacity>
            </View>
            <Text style={commonStyles.title}>Fill your information</Text>
            <Text style={commonStyles.subtitle}>You can edit this later on your account setting.</Text>
            <TouchableOpacity onPress={pickImage}>
                {profilePicture ? (
                    <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                ) : (
                    <Image source={require('../../assets/icons/profile-placeholder.png')} style={styles.profilePicture} />
                )}
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <Image source={require('../../assets/icons/fullName.png')} style={styles.inputBackground} />
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                />
            </View>
            <Text style={commonStyles.label}>Email</Text>
            <View style={styles.inputContainer}>
                <Image source={require('../../assets/icons/email.png')} style={styles.inputBackground} />
                <Text style={styles.input}>{email}</Text>
            </View>
            <TouchableOpacity style={commonStyles.nextButton} onPress={handleFinish}>
                <Image source={require('../../assets/icons/finish.png')} style={commonStyles.finish} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 20,
    },
    inputContainer: {
        position: 'relative',
        width: '100%',
        marginVertical: 10,
    },
    inputBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        width: '100%',
        backgroundColor: 'transparent',
    },
});

export default UserInfoScreen;