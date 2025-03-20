import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import commonStyles from '../../../utils/commonStyles';

const ProductTour3 = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={commonStyles.container}>
            <ImageBackground source={require('../../assets/ProductTour/ProdTour1.png')} style={commonStyles.background}>
                <TouchableOpacity style={commonStyles.skipButton} onPress={() => navigation.navigate("AccountSetupScreen")}>
                    <Text style={commonStyles.skipButtonText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.button, styles.nextButton]} onPress={() => navigation.navigate("AccountSetupScreen")}>
                    <Text style={commonStyles.buttonText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.button, styles.nextButton]} onPress={() => navigation.navigate("ProdTour2")}>
                    <Text style={commonStyles.buttonText}>Back</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    nextButton: {
        backgroundColor: '#8BC83F',
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 20,
    },
});

export default ProductTour3;