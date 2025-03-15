import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import commonStyles from '../../utils/commonStyles';

const SalesPropertiesScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <Text style={styles.title}>Limited time Properties Sale Season is coming back!</Text>
      <Image source={require('../../assets/icons/Coupon.png')} style={styles.couponImage} />
      <Text style={styles.description}>
        Use this coupon to get a discount on your next property purchase. Simply apply the coupon code at checkout to enjoy the savings!
      </Text>
      <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('HomeScreen')}>
        <Image source={require('../../assets/icons/explore.png')} style={styles.couponImage} />
        <Text style={commonStyles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  couponImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});

export default SalesPropertiesScreen;