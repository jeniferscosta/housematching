import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, ImageBackground, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import commonStyles from '../../utils/commonStyles';
import { NavigationProp } from '@react-navigation/native';

const LocationConfigStep1 = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);
    const [locationDetails, setLocationDetails] = useState('');
    const [manualLocation, setManualLocation] = useState('');
    const [region, setRegion] = useState({
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const handleToggleSwitch = async () => {
        setIsLocationEnabled((previousState: boolean) => !previousState);
        if (!isLocationEnabled) {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Permission to access location was denied');
                setLocationDetails('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocationDetails(`Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            Alert.alert('Location Retrieved', `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);
        } else {
            setLocationDetails('');
        }
    };

    const handleNext = async () => {
        const locationInfo = isLocationEnabled ? locationDetails : manualLocation;
        try {
            const response = await fetch('http://localhost:3000/api/location/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: 'some-user-id', locationInfo }),
            });

            if (!response.ok) {
                throw new Error('Failed to save location');
            }

            navigation.navigate('HomeScreen', { locationInfo });
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error', 'An unknown error occurred');
            }
        }
    };

    const handleSkip = () => {
        navigation.navigate('HomeScreen', { locationInfo: '' });
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/AccountSetup/LocationEmptyStep1.png')} style={commonStyles.background} resizeMode="cover" onError={(error: any) => console.log(error)} />
            <Text style={styles.label}>Share Location</Text>
            <Switch
                onValueChange={handleToggleSwitch}
                value={isLocationEnabled}
            />
            {isLocationEnabled ? (
                <View style={styles.locationContainer}>
                    <Text style={styles.label}>Location Details</Text>
                    <TextInput
                        style={styles.input}
                        value={locationDetails}
                        editable={false}
                    />
                    <MapView
                        style={styles.map}
                        region={region}
                    >
                        <Marker
                            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                            title="Your Location"
                        />
                    </MapView>
                </View>
            ) : (
                <View style={styles.locationContainer}>
                    <Text style={styles.label}>Enter Location Manually</Text>
                    <TextInput
                        style={styles.input}
                        value={manualLocation}
                        onChangeText={setManualLocation}
                        placeholder="Enter your location"
                    />
                </View>
            )}
            <Button title="Next" onPress={handleNext} />
            <Button title="Skip" onPress={handleSkip} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationContainer: {
        marginTop: 20,
    },
    map: {
        width: '100%',
        height: 200,
        marginTop: 10,
    },
});

export default LocationConfigStep1;