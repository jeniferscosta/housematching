import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Picker, Alert } from 'react-native';

const priceRanges = ['$100,000', '$200,000', '$300,000', '$400,000', '$500,000', '$600,000', '$700,000', '$800,000'];
const areaRanges = ['30m2', '60m2', '90m2', '120m2', '150m2', '180m2', '210m2', '240m2', '270m2', '300m2'];
const distanceRanges = ['5km', '10km'];

const amenities = ['Pool', 'Pet Allowed', 'Pharmacy', 'Garden', 'Gym', 'Park', 'Supermarket'];

const PropertyAmenitiesScreen = ({ navigation, route }) => {
    const { email } = route.params;
    const [priceRange, setPriceRange] = useState('');
    const [areaRange, setAreaRange] = useState('');
    const [distanceRange, setDistanceRange] = useState('');
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [parkingSpots, setParkingSpots] = useState(0);
    const [totalRooms, setTotalRooms] = useState(0);
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const toggleAmenity = (amenity) => {
        setSelectedAmenities((prevSelectedAmenities) =>
            prevSelectedAmenities.includes(amenity)
                ? prevSelectedAmenities.filter((a) => a !== amenity)
                : [...prevSelectedAmenities, amenity]
        );
    };

    const handleFinish = async () => {
        Alert.alert(
            'Warning',
            'This action will impact your experience using the app.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            const response = await fetch('http://your-api-endpoint.com/save-user-preferences', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    email,
                                    priceRange,
                                    areaRange,
                                    distanceRange,
                                    bedrooms,
                                    bathrooms,
                                    parkingSpots,
                                    totalRooms,
                                    amenities: selectedAmenities,
                                }),
                            });

                            if (response.ok) {
                                navigation.navigate('HomeScreen'); // Replace 'HomeScreen' with the actual home screen
                            } else {
                                console.error('Failed to save user preferences');
                            }
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleSkip = () => {
        Alert.alert(
            'Warning',
            'This action will impact your experience using the app.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('HomeScreen'), // Replace 'HomeScreen' with the actual home screen
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Property Amenities</Text>

            <Text style={styles.label}>Price Range</Text>
            <Picker selectedValue={priceRange} onValueChange={(itemValue) => setPriceRange(itemValue)}>
                {priceRanges.map((range) => (
                    <Picker.Item key={range} label={range} value={range} />
                ))}
            </Picker>

            <Text style={styles.label}>Total Area Range</Text>
            <Picker selectedValue={areaRange} onValueChange={(itemValue) => setAreaRange(itemValue)}>
                {areaRanges.map((range) => (
                    <Picker.Item key={range} label={range} value={range} />
                ))}
            </Picker>

            <Text style={styles.label}>Acceptable Range from Current Location</Text>
            <Picker selectedValue={distanceRange} onValueChange={(itemValue) => setDistanceRange(itemValue)}>
                {distanceRanges.map((range) => (
                    <Picker.Item key={range} label={range} value={range} />
                ))}
            </Picker>

            <Text style={styles.label}>Bedrooms</Text>
            <View style={styles.counterContainer}>
                <Button title="-" onPress={() => setBedrooms(Math.max(0, bedrooms - 1))} />
                <Text style={styles.counterText}>{bedrooms}</Text>
                <Button title="+" onPress={() => setBedrooms(bedrooms + 1)} />
            </View>

            <Text style={styles.label}>Bathrooms</Text>
            <View style={styles.counterContainer}>
                <Button title="-" onPress={() => setBathrooms(Math.max(0, bathrooms - 1))} />
                <Text style={styles.counterText}>{bathrooms}</Text>
                <Button title="+" onPress={() => setBathrooms(bathrooms + 1)} />
            </View>

            <Text style={styles.label}>Parking Spots</Text>
            <View style={styles.counterContainer}>
                <Button title="-" onPress={() => setParkingSpots(Math.max(0, parkingSpots - 1))} />
                <Text style={styles.counterText}>{parkingSpots}</Text>
                <Button title="+" onPress={() => setParkingSpots(parkingSpots + 1)} />
            </View>

            <Text style={styles.label}>Total Rooms</Text>
            <View style={styles.counterContainer}>
                <Button title="-" onPress={() => setTotalRooms(Math.max(0, totalRooms - 1))} />
                <Text style={styles.counterText}>{totalRooms}</Text>
                <Button title="+" onPress={() => setTotalRooms(totalRooms + 1)} />
            </View>

            <Text style={styles.label}>Environment Facilities</Text>
            <View style={styles.amenitiesContainer}>
                {amenities.map((amenity) => (
                    <TouchableOpacity
                        key={amenity}
                        style={[
                            styles.amenityButton,
                            selectedAmenities.includes(amenity) && styles.selectedAmenity,
                        ]}
                        onPress={() => toggleAmenity(amenity)}
                    >
                        <Text style={styles.amenityText}>{amenity}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Skip" onPress={handleSkip} />
                <Button title="Finish" onPress={handleFinish} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    label: {
        fontSize: 18,
        marginTop: 16,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    counterText: {
        fontSize: 18,
        marginHorizontal: 16,
    },
    amenitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 16,
    },
    amenityButton: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    selectedAmenity: {
        backgroundColor: '#d3d3d3',
    },
    amenityText: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default PropertyAmenitiesScreen;