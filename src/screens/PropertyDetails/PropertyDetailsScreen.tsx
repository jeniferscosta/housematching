import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Share, Alert, FlatList, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

type PropertyDetailsProps = StackScreenProps<RootStackParamList, 'PropertyDetailsScreen'>;

const PropertyDetails = ({ route, navigation }: PropertyDetailsProps) =>  {
    const propertyId = route.params?.propertyId;
    if (!propertyId) {
        Alert.alert('Error', 'Property ID is missing');
        navigation.goBack();
        return null;
    }
    const [property, setProperty] = useState<{ title: string; description: string; price: string; contactInfo: string; images: string[]; location: { latitude: number; longitude: number } } | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            const response = await fetch(`http://localhost:3000/api/properties/${propertyId}`);
            const data = await response.json();
            setProperty(data);
        };

        fetchProperty();
    }, [propertyId]);

    const addToFavorites = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ propertyId }),
            });
            if (!response.ok) {
                throw new Error('Failed to add to favorites');
            }
            setIsFavorite(true);
            Alert.alert('Success', 'Property added to favorites');
        } catch (error) {
            Alert.alert('Error', (error as Error).message);
        }
    };

    const shareProperty = async () => {
        try {
            if (!property) {
                Alert.alert('Error', 'Property details are not available');
                return;
            }
            const result = await Share.share({
                message: `Check out this property: ${property.title}\n${property.description}\nPrice: ${property.price}\nContact: ${property.contactInfo}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // Shared with activity type of result.activityType
                } else {
                    // Shared
                }
            } else if (result.action === Share.dismissedAction) {
                // Dismissed
            }
        } catch (error) {
            Alert.alert('Error', (error as Error).message);
        }
    };

    if (!property) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/back.png')} style={styles.iconImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={addToFavorites}>
                    <Image source={require('../../assets/icons/favorite.png')} style={[styles.iconImage, isFavorite && styles.favoriteIcon]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={shareProperty}>
                    <Image source={require('../../assets/icons/share.png')} style={styles.iconImage} />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{property.title}</Text>
            <View style={styles.imageContainer}>
                <Image source={{ uri: property.images[0] }} style={styles.propertyImage} />
                <FlatList
                    data={property.images}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.galleryImage} />
                    )}
                    style={styles.gallery}
                />
            </View>
            <Text style={styles.description}>{property.description}</Text>
            <Text style={styles.price}>{property.price}</Text>
            <Text style={styles.contactInfo}>{property.contactInfo}</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: property.location.latitude,
                    longitude: property.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: property.location.latitude,
                        longitude: property.location.longitude,
                    }}
                    title={property.title}
                    description={property.description}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconButton: {
        padding: 10,
    },
    iconImage: {
        width: 24,
        height: 24,
    },
    favoriteIcon: {
        tintColor: 'red',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    propertyImage: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    gallery: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    galleryImage: {
        width: 50,
        height: 50,
        marginRight: 5,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    contactInfo: {
        fontSize: 16,
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: 300,
    },
});

export default PropertyDetails;