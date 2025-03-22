import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput, Button, Modal } from 'react-native';
import { ScreenProps } from '../../navigation/types';
import * as ImagePicker from 'expo-image-picker';

type RouteParams = {
    email?: string;
    fullName?: string;
};

const AccountSetupScreen: React.FC<ScreenProps<'AccountSetupScreen'>> = ({ navigation, route }) => {
    const params = (route.params ?? {}) as RouteParams;
    const initialEmail = params?.email || '';
    const [fullName, setFullName] = useState(params?.fullName || '');
    const [email, setEmail] = useState(initialEmail || '');
    const [telephone, setTelephone] = useState('');
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (fullName && email && telephone && profilePicture) {
            setIsNextEnabled(true);
        } else {
            setIsNextEnabled(false);
        }
    }, [fullName, email, telephone, profilePicture]);

    const handleProfilePictureSelection = () => {
        launchImageLibrary({}, (response: any) => {
            if (response.assets && response.assets.length > 0) {
                setProfilePicture(response.assets[0].uri);
            }
        });
    };

    const handleNext = async () => {
        // Save the information to the database (pseudo-code)
        // saveToDatabase({ fullName, email, telephone, profilePicture });
        try {
            const response = await fetch('http://your-api-endpoint.com/save-user-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    telephone,
                    profilePicture,
                }),
            });
    
            if (response.ok) {
                setIsModalVisible(true);
            } else {
                // Handle error
                console.error('Failed to save user information');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFinish = () => {
        setIsModalVisible(false);
        navigation.navigate('HomeScreen');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
            />
            <Text style={styles.label}>Telephone</Text>
            <TextInput
                style={styles.input}
                value={telephone}
                onChangeText={setTelephone}
                keyboardType="phone-pad"
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                editable={false}
                keyboardType="email-address"
            />
            <TouchableOpacity onPress={handleProfilePictureSelection}>
                <View style={styles.profilePictureContainer}>
                    {profilePicture ? (
                        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                    ) : (
                        <Text>Select Profile Picture</Text>
                    )}
                </View>
            </TouchableOpacity>
            <Button
                title="Next"
                onPress={handleNext}
                disabled={!isNextEnabled}
            />
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Account created successfully!</Text>
                        <Button title="Finish" onPress={handleFinish} />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
    },
    profilePictureContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        marginBottom: 16,
    },
    profilePicture: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default AccountSetupScreen;
async function launchImageLibrary(options: ImagePicker.ImagePickerOptions, callback: (response: any) => void) {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your photos!");
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
        callback({ assets: [result] });
    } else {
        callback({ assets: [] });
    }
}

