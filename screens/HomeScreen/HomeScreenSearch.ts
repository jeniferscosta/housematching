// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);

  const searchProperties = async () => {
	// Fetch properties from backend
	const response = await fetch(`http://localhost:3000/api/properties?query=${searchQuery}`);
	const data = await response.json();
	setProperties(data);
  };

  return (
	<View>
	  <TextInput
		placeholder="Search for properties"
		value={searchQuery}
		onChangeText={setSearchQuery}
	  />
	  <Button title="Search" onPress={searchProperties} />
	  <FlatList
		data={properties}
		keyExtractor={(item) => item._id}
		renderItem={({ item }) => (
		  <Text onPress={() => navigation.navigate('PropertyDetails', { propertyId: item._id })}>
			{item.title}
		  </Text>
		)}
	  />
	</View>
  );
};

export default HomeScreen;