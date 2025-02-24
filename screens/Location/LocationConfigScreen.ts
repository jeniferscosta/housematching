import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import * as Location from 'expo-location';

const LocationConfigScreen = ({ navigation }) => {
	const [isLocationEnabled, setIsLocationEnabled] = useState(false);
	const [locationDetails, setLocationDetails] = useState('');
	const [manualLocation, setManualLocation] = useState('');

	const handleToggleSwitch = async () => {
		setIsLocationEnabled(previousState => !previousState);
		if (!isLocationEnabled) {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setLocationDetails('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocationDetails(`Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);
		} else {
			setLocationDetails('');
		}
	};

	const handleNext = () => {
		const locationInfo = isLocationEnabled ? locationDetails : manualLocation;
		navigation.navigate('NextScreen', { locationInfo });
	};
    const handleSkip = () => {
        navigation.navigate('NextScreen', { locationInfo: '' });
    };

	return (
		<View style={styles.container}>
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
});

export default LocationConfigScreen;