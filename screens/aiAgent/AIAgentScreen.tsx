import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import commonStyles from '../../utils/commonStyles';

const AIAgentScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    if (query.trim() === '') return;

    try {
      const response = await fetch('http://localhost:3000/api/ai/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const renderRecommendationItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PropertyDetailsScreen', { propertyId: item._id })}>
      <Image source={{ uri: item.image }} style={styles.propertyImage} />
      <Text style={styles.propertyTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={commonStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../../assets/icons/back.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Agent</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Ask for property recommendations..."
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.searchButton} onPress={fetchRecommendations}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item._id}
        renderItem={renderRecommendationItem}
        style={styles.recommendationsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  backButton: {
    marginLeft: 10,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginVertical: 10,
  },
  searchButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 20,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  recommendationsList: {
    marginTop: 20,
  },
  propertyImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  propertyTitle: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default AIAgentScreen;