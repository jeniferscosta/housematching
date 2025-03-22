import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import commonStyles from '../../utils/commonStyles';

const properties = [
    { id: '1', image: require('../../assets/properties/category1.png'), selectedImage: require('../../assets/properties/category1_selected.png') },
    { id: '2', image: require('../../assets/properties/category2.png'), selectedImage: require('../../assets/properties/category2_selected.png') },
    { id: '3', image: require('../../assets/properties/category3.png'), selectedImage: require('../../assets/properties/category3_selected.png') },
    { id: '4', image: require('../../assets/properties/category4.png'), selectedImage: require('../../assets/properties/category4_selected.png') },
    { id: '5', image: require('../../assets/properties/category5.png'), selectedImage: require('../../assets/properties/category5_selected.png') },
    { id: '6', image: require('../../assets/properties/category6.png'), selectedImage: require('../../assets/properties/category6_selected.png') },
];

const PropertySelectionScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
    const userId = 'some-user-id'; // Replace with actual user ID

    const toggleSelection = (id: string) => {
        setSelectedProperties((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((propertyId) => propertyId !== id) : [...prevSelected, id]
        );
    };

    const handleNext = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/selection/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, selectedProperties }),
            });

            if (!response.ok) {
                throw new Error('Failed to save properties');
            }

            // Navigate to the next screen
            navigation.navigate('NextScreen');
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error', 'An unknown error occurred');
            }
        }
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => toggleSelection(item.id)}>
            <Image
                source={selectedProperties.includes(item.id) ? item.selectedImage : item.image}
                style={styles.propertyImage}
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={commonStyles.header}>
                <TouchableOpacity style={commonStyles.backButtonImage} onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/back.png')} style={commonStyles.backButtonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.skipButton} onPress={() => navigation.navigate('NextScreen')}>
                    <Image source={require('../../assets/icons/skip.png')} style={commonStyles.skipButton} />
                </TouchableOpacity>
            </View>
            <Text style={commonStyles.title}>Select your preferable real estate type</Text>
            <Text style={commonStyles.subtitle}>You can edit this later on your account setting.</Text>
            <FlatList
                data={properties}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={commonStyles.row}
            />
            <TouchableOpacity style={commonStyles.nextButton} onPress={handleNext}>
                <Image source={require('../../assets/icons/next.png')} style={commonStyles.nextButton} />
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
        propertyImage: {
        width: 160,
        height: 212,
        marginBottom: 16,
    },
});

export default PropertySelectionScreen;