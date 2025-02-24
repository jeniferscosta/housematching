import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Image, StyleSheet, ScrollView } from 'react-native';

const propertyTypes = [
	{ type: 'House', image: require('./assets/house.png') },
	{ type: 'Apartment', image: require('./assets/apartment.png') },
	{ type: 'Villa', image: require('./assets/villa.png') },
	{ type: 'Cottage', image: require('./assets/cottage.png') },
	{ type: 'Penthouse', image: require('./assets/penthouse.png') },
	{ type: 'Studio', image: require('./assets/studio.png') },
];

const PropertyTypeSelectionScreen = ({ navigation, route }) => {
	const { email } = route.params;
	const [selectedTypes, setSelectedTypes] = useState([]);
	const [isNextEnabled, setIsNextEnabled] = useState(false);

	useEffect(() => {
		setIsNextEnabled(selectedTypes.length > 0);
	}, [selectedTypes]);

	const toggleSelection = (type) => {
		setSelectedTypes((prevSelectedTypes) =>
			prevSelectedTypes.includes(type)
				? prevSelectedTypes.filter((t) => t !== type)
				: [...prevSelectedTypes, type]
		);
	};

	const handleNext = async () => {
		try {
			const response = await fetch('http://your-api-endpoint.com/save-user-preferences', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					propertyTypes: selectedTypes,
				}),
			});

			if (response.ok) {
				navigation.navigate('NextScreen'); // Replace 'NextScreen' with the actual next screen in your flow
			} else {
				console.error('Failed to save user preferences');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleSkip = () => {
		navigation.navigate('NextScreen'); // Replace 'NextScreen' with the actual next screen in your flow
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Select Property Types</Text>
			{propertyTypes.map((property) => (
				<TouchableOpacity
					key={property.type}
					style={[
						styles.propertyContainer,
						selectedTypes.includes(property.type) && styles.selected,
					]}
					onPress={() => toggleSelection(property.type)}
				>
					<Image source={property.image} style={styles.propertyImage} />
					<Text style={styles.propertyText}>{property.type}</Text>
				</TouchableOpacity>
			))}
			<View style={styles.buttonContainer}>
				<Button title="Skip" onPress={handleSkip} />
				<Button title="Next" onPress={handleNext} disabled={!isNextEnabled} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 16,
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		marginBottom: 16,
	},
	propertyContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 4,
	},
	selected: {
		backgroundColor: '#d3d3d3',
	},
	propertyImage: {
		width: 50,
		height: 50,
		marginRight: 10,
	},
	propertyText: {
		fontSize: 18,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginTop: 20,
	},
});

export default PropertyTypeSelectionScreen;