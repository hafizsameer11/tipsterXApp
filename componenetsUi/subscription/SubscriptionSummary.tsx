import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type SubscriptionSummaryProps = {
    selectedPackage: string;
    activePackage: string;
};

const packages = [
    { id: 'daily', label: '1 day', price: 1000 },
    { id: 'weekly', label: '1 week', price: 6000 },
    { id: 'monthly', label: '1 month', price: 20000 }
];

const SubscriptionSummary: React.FC<SubscriptionSummaryProps> = ({ selectedPackage, activePackage }) => {
    const selectedPkg = packages.find(pkg => pkg.id === selectedPackage);
    const isSubscribed = selectedPackage === activePackage;

    return (
        <View style={styles.summaryContainer}>
            {selectedPkg && (
                <TouchableOpacity style={[styles.subscribeButton, isSubscribed && styles.disabledButton]} disabled={isSubscribed}>
                    {isSubscribed &&  <Image source={require('@/assets/images/checkA.png')} style={styles.checkIcon} />}
                    <Text style={[styles.subscribeText,isSubscribed && styles.disabledButtonText]}>
                        {isSubscribed ? `${selectedPkg.label} subscription active` : `Get ${selectedPkg.label} for N ${selectedPkg.price.toLocaleString()}`}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default SubscriptionSummary;

const styles = StyleSheet.create({
  summaryContainer: {
    marginVertical: 20,
  },
  activeText: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 10,
  },
  subscribeButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row"
  },
  disabledButton: {
    backgroundColor: '#222',
  },
  disabledButtonText:{
    color:'white'
  },
  subscribeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  checkIcon:{
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginHorizontal: 10,
  }
});