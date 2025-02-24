import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductTour = () => {
	const navigation = useNavigation();

	return (
		<ImageBackground 
			source={require('../../assets/ProductTour/ProdTour1.png').default} 
			style={styles.background}
			resizeMode="contain"
		>
			<TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('NextScreen')}>
				<Text style={styles.skipButtonText}>Skip</Text>
			</TouchableOpacity>
			<View style={styles.container}>
				{/* Add your content here */}
			</View>
			<TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('NextScreen')}>
				<Text style={styles.nextButtonText}>Next</Text>
			</TouchableOpacity>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		width: 375,
		height: 812,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	skipButton: {
		position: 'absolute',
		top: 20,
		right: 20,
		width: 86,
		height: 38,
		backgroundColor: '#DFDFDF',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	skipButtonText: {
		color: '#000',
		fontSize: 16,
	},
	nextButton: {
		width: 190,
		height: 54,
		backgroundColor: '#8BC83F',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 27,
		marginBottom: 20,
	},
	nextButtonText: {
		color: '#fff',
		fontSize: 18,
	},
});

export default ProductTour;