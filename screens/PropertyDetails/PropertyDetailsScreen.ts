// screens/PropertyDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const PropertyDetailsScreen = ({ route }) => {
    const { propertyId } = route.params;
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            const response = await fetch(`http://localhost:3000/api/properties/${propertyId}`);
            const data = await response.json();
            setProperty(data);
        };

        fetchProperty();
    }, [propertyId]);

    if (!property) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text>{property.title}</Text>
            <Image source={{ uri: property.images[0] }} style={{ width: 100, height: 100 }} />
            <Text>{property.description}</Text>
            <Text>{property.price}</Text>
            <Text>{property.contactInfo}</Text>
            <Button title="Add to Favorites" onPress={() => { /* Add to favorites logic */ }} />
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
    map: {
        width: '100%',
        height: 300,
    },
});

export default PropertyDetailsScreen;