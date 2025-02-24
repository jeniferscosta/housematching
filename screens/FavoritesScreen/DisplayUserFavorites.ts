// screens/FavoritesScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';

const FavoritesScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
	const fetchFavorites = async () => {
	  const response = await fetch(`http://localhost:3000/api/users/${userId}/favorites`);
	  const data = await response.json();
	  setFavorites(data);
	};

	fetchFavorites();
  }, [userId]);

  return (
	<View>
	  <FlatList
		data={favorites}
		keyExtractor={(item) => item._id}
		renderItem={({ item }) => (
		  <TouchableOpacity onPress={() => navigation.navigate('PropertyDetails', { propertyId: item._id, userId })}>
			<Text>{item.title}</Text>
		  </TouchableOpacity>
		)}
	  />
	</View>
  );
};

export default FavoritesScreen;