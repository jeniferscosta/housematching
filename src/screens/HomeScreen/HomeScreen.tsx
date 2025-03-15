import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import commonStyles from '../../utils/commonStyles';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    // Fetch the profile picture URL from the backend or use a placeholder
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/profile-picture');
        const data = await response.json();
        setProfilePicture(data.profilePicture || require('../../assets/icons/profile-placeholder.png'));
      } catch (error) {
        console.error('Error fetching profile picture:', error);
        setProfilePicture(require('../../assets/icons/profile-placeholder.png'));
      }
    };

    fetchProfilePicture();
  }, []);

  const searchProperties = async () => {
    try {
      // Fetch properties from backend based on the search query
      const response = await fetch(`http://localhost:3000/api/properties?query=${searchQuery}`);
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  let locationText = 'Waiting..';
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`;
  }

  return (
    <ImageBackground source={require('../../assets/HomeScreen/FullBgHome.png')} style={commonStyles.background}>
      <View style={commonStyles.container}>
        <View style={commonStyles.topContainer}>
          <Image source={profilePicture} style={commonStyles.profilePicture} />
          <Text style={commonStyles.locationText}>{locationText}</Text>
          <TouchableOpacity style={commonStyles.iconButton} onPress={() => navigation.navigate('NotificationsScreen')}>
            <Image source={require('../../assets/icons/notification.png')} style={commonStyles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.iconButton} onPress={() => navigation.navigate('AIAgentScreen')}>
            <Image source={require('../../assets/icons/ai-agent.png')} style={commonStyles.iconImage} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={commonStyles.input}
          placeholder="Search for properties"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={searchProperties} />

        {/* Sales Properties and Under Construction Buttons */}
        <View style={styles.imageButtonsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SalesPropertiesScreen')}>
            <Image source={require('../../assets/homeScreen/sales-properties.png')} style={styles.imageButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UnderConstructionScreen')}>
            <Image source={require('../../assets/icons/under-construction.png')} style={styles.imageButton} />
          </TouchableOpacity>
        </View>
        
        {/* Property Bundle 1 */}
        <View style={styles.bundleContainer}>
          <Text style={styles.bundleTitle}>Featured Properties</Text>
          <FlatList
            horizontal
            data={properties.slice(0, 5)} // Display first 5 properties as a bundle
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('PropertyDetails', { propertyId: item._id })}>
                <Image source={{ uri: item.image }} style={styles.bundleImage} />
                <Text style={styles.bundleText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Property Bundle 2 */}
        <View style={styles.bundleContainer}>
          <Text style={styles.bundleTitle}>New Listings</Text>
          <FlatList
            horizontal
            data={properties.slice(5, 10)} // Display next 5 properties as a bundle
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('PropertyDetails', { propertyId: item._id })}>
                <Image source={{ uri: item.image }} style={styles.bundleImage} />
                <Text style={styles.bundleText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <FlatList
          data={properties}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Text style={commonStyles.propertyItem} onPress={() => navigation.navigate('PropertyDetails', { propertyId: item._id })}>
              {item.title}
            </Text>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  imageButton: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  bundleContainer: {
    marginVertical: 20,
  },
  bundleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bundleImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  bundleText: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default HomeScreen;