import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
	MapScreen: { locationInfo: string };
	NextScreen: { locationInfo: string };
};

type MapScreenRouteProp = RouteProp<RootStackParamList, 'MapScreen'>;
type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MapScreen'>;

const MapScreen = ({ route, navigation }: { route: MapScreenRouteProp; navigation: MapScreenNavigationProp }) => {
	const { locationInfo } = route.params;
	const [modalVisible, setModalVisible] = useState(false);

	const [location, setLocation] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	useEffect(() => {
		if (locationInfo.includes('Latitude')) {
			const match = locationInfo.match(/-?\d+(\.\d+)?/g);
			if (match) {
				const [lat, lon] = match.map(Number);
			}
		}
	}, [locationInfo]);

    const handleNext = () => {
        navigation.navigate('NextScreen', { locationInfo });
    };

    const handleSkip = () => {
        navigation.navigate('NextScreen', { locationInfo: '' });
    };

	function handleMarkerDragEnd(event: any): void {
		const { latitude, longitude } = event.nativeEvent.coordinate;
		setLocation((prevLocation) => ({
			...prevLocation,
			latitude,
			longitude,
		}));
	}
	return (
		<View style={styles.container}>
            <MapView style={styles.map} region={location}>
                <Marker
                    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                    draggable
                    onDragEnd={handleMarkerDragEnd}
					onPress={() => setModalVisible(true)}
				/>
			</MapView>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>{locationInfo}</Text>
					<Button title="Close" onPress={() => setModalVisible(false)} />
				</View>
			</Modal>
            <View style={styles.buttonContainer}>
                <Button title="Next" onPress={handleNext} />
                <Button title="Skip" onPress={handleSkip} />
            </View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
});

export default MapScreen;