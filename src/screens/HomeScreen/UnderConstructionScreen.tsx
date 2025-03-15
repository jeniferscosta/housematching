import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import commonStyles from '../../utils/commonStyles';

const UnderConstructionScreen = ({ navigation }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchUnderConstructionProperties = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/properties?status=under-construction');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchUnderConstructionProperties();
  }, []);

  return (
    <View style={commonStyles.container}>
      <Image source={require('../../assets/icons/under-construction.png')} style={styles.headerImage} />
      <Text style={styles.title}>Properties Under Construction</Text>
      <FlatList
        data={properties}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PropertyDetails', { propertyId: item._id })}>
            <View style={styles.propertyItem}>
              <Image source={{ uri: item.image }} style={styles.propertyImage} />
              <Text style={styles.propertyTitle}>{item.title}</Text>
              <Text style={styles.propertyDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={commonStyles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: 150,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  propertyItem: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  propertyImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  propertyDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default UnderConstructionScreen;