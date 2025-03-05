import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Picker, Image, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import commonStyles from '../../utils/commonStyles';

const AmenitiesConfigScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [priceRange, setPriceRange] = useState('');
    const [totalAreaRange, setTotalAreaRange] = useState('');
    const [locationRange, setLocationRange] = useState('');
    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [parkingSpots, setParkingSpots] = useState(1);
    const [toilets, setToilets] = useState(1);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

    const toggleFacilitySelection = (facility: string) => {
        setSelectedFacilities((prevSelected) =>
            prevSelected.includes(facility) ? prevSelected.filter((item) => item !== facility) : [...prevSelected, facility]
        );
    };

    const handleFinish = async () => {
        try {
            // Save the amenities preferences to the database
            const response = await fetch('http://localhost:3000/api/amenities/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: 'some-user-id', priceRange, totalAreaRange, locationRange, bedrooms, bathrooms, parkingSpots, toilets, selectedFacilities }),
            });

            if (!response.ok) {
                throw new Error('Failed to save amenities');
            }

            // Navigate to the home page
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={commonStyles.header}>
                <TouchableOpacity style={commonStyles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/back.png')} style={commonStyles.backButtonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.skipButton} onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../../assets/icons/skip.png')} style={commonStyles.skipButtonImage} />
                </TouchableOpacity>
            </View>
            <Text style={commonStyles.title}>Almost finish, complete the amenities information</Text>
            <Text style={commonStyles.label}>Price range</Text>
            <Picker selectedValue={priceRange} onValueChange={(itemValue) => setPriceRange(itemValue)}>
                <Picker.Item label="$ 150,000 - $250,000" value="$150000-$250000" />
                <Picker.Item label="$ 250,000 - $350,000" value="$250000-$350000" />
                <Picker.Item label="$ 350,000 - $450,000" value="$350000-$450000" />
            </Picker>
            <Text style={commonStyles.label}>Total area range</Text>
            <Picker selectedValue={totalAreaRange} onValueChange={(itemValue) => setTotalAreaRange(itemValue)}>
                <Picker.Item label="100 - 200m2" value="100-200" />
                <Picker.Item label="200 - 300m2" value="200-300" />
                <Picker.Item label="300 - 400m2" value="300-400" />
            </Picker>
            <Text style={commonStyles.label}>Acceptable range considering your currently location</Text>
            <Picker selectedValue={locationRange} onValueChange={(itemValue) => setLocationRange(itemValue)}>
                <Picker.Item label="2-5km" value="2-5" />
                <Picker.Item label="5-10km" value="5-10" />
                <Picker.Item label="10-20km" value="10-20" />
            </Picker>
            <Text style={commonStyles.label}>Property Features</Text>
            <View style={styles.featureRow}>
                <Text>Bedrooms</Text>
                <View style={styles.counter}>
                    <TouchableOpacity onPress={() => setBedrooms(Math.max(1, bedrooms - 1))}>
                        <Text>-</Text>
                    </TouchableOpacity>
                    <Text>{bedrooms}</Text>
                    <TouchableOpacity onPress={() => setBedrooms(Math.min(5, bedrooms + 1))}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.featureRow}>
                <Text>Bathrooms</Text>
                <View style={styles.counter}>
                    <TouchableOpacity onPress={() => setBathrooms(Math.max(1, bathrooms - 1))}>
                        <Text>-</Text>
                    </TouchableOpacity>
                    <Text>{bathrooms}</Text>
                    <TouchableOpacity onPress={() => setBathrooms(Math.min(5, bathrooms + 1))}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.featureRow}>
                <Text>Parking Spots</Text>
                <View style={styles.counter}>
                    <TouchableOpacity onPress={() => setParkingSpots(Math.max(1, parkingSpots - 1))}>
                        <Text>-</Text>
                    </TouchableOpacity>
                    <Text>{parkingSpots}</Text>
                    <TouchableOpacity onPress={() => setParkingSpots(Math.min(5, parkingSpots + 1))}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.featureRow}>
                <Text>Toilets</Text>
                <View style={styles.counter}>
                    <TouchableOpacity onPress={() => setToilets(Math.max(1, toilets - 1))}>
                        <Text>-</Text>
                    </TouchableOpacity>
                    <Text>{toilets}</Text>
                    <TouchableOpacity onPress={() => setToilets(Math.min(5, toilets + 1))}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={commonStyles.label}>Environment / Facilities</Text>
            <View style={styles.facilitiesContainer}>
                {['Gym', 'Pool', 'Garden', 'Playground'].map((facility) => (
                    <React.Fragment key={facility}>
                        <TouchableOpacity onPress={() => toggleFacilitySelection(facility)}>
                            <Image
                                source={selectedFacilities.includes(facility) ? require(`../../assets/facilities/${facility.toLowerCase()}Category1_Active.png`) : require(`../../assets/facilities/${facility.toLowerCase()}Category1.png`)}
                                style={styles.facilityImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleFacilitySelection(facility)}>
                            <Image
                                source={selectedFacilities.includes(facility) ? require(`../../assets/facilities/${facility.toLowerCase()}Category2_Active.png`) : require(`../../assets/facilities/${facility.toLowerCase()}Category2.png`)}
                                style={styles.facilityImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleFacilitySelection(facility)}>
                            <Image
                                source={selectedFacilities.includes(facility) ? require(`../../assets/facilities/${facility.toLowerCase()}Category3_Active.png`) : require(`../../assets/facilities/${facility.toLowerCase()}Category3.png`)}
                                style={styles.facilityImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleFacilitySelection(facility)}>
                            <Image
                                source={selectedFacilities.includes(facility) ? require(`../../assets/facilities/${facility.toLowerCase()}Category4_Active.png`) : require(`../../assets/facilities/${facility.toLowerCase()}Category4.png`)}
                                style={styles.facilityImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleFacilitySelection(facility)}>
                            <Image
                                source={selectedFacilities.includes(facility) ? require(`../../assets/facilities/${facility.toLowerCase()}Category5_Active.png`) : require(`../../assets/facilities/${facility.toLowerCase()}Category5.png`)}
                                style={styles.facilityImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleFacilitySelection(facility)}>
                            <Image
                                source={selectedFacilities.includes(facility) ? require(`../../assets/facilities/${facility.toLowerCase()}Category6_Active.png`) : require(`../../assets/facilities/${facility.toLowerCase()}Category6.png`)}
                                style={styles.facilityImage}
                            />
                        </TouchableOpacity>
                    </React.Fragment>
                ))}
            </View>
            <TouchableOpacity style={commonStyles.nextButton} onPress={handleFinish}>
                <Image source={require('../../assets/icons/finish.png')} style={commonStyles.nextButtonImage} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    featureRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    facilitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    facilityImage: {
        width: 50,
        height: 50,
        margin: 5,
    },
});

export default AmenitiesConfigScreen;