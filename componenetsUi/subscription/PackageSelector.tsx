import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type PackageProps = {
    selectedPackage: string;
    setSelectedPackage: (pkg: string) => void;
};

const packages = [
    { id: 'daily', label: 'day', price: 1000 },
    { id: 'monthly', label: 'month', price: 20000, discount: 'Save 25%' },
    { id: 'weekly', label: 'week', price: 6000 },
];

const PackageSelector: React.FC<PackageProps> = ({ selectedPackage, setSelectedPackage }) => (
    <View style={styles.packageContainer}>
        {packages.map((pkg) => (
            <TouchableOpacity
                key={pkg.id}
                style={[styles.packageBox, selectedPackage === pkg.id && styles.selectedPackage]}
                onPress={() => setSelectedPackage(pkg.id)}
            >
                {pkg.discount && <Text style={styles.discountText}>{pkg.discount}</Text>}
                <Text style={styles.packageLabel}>1</Text>
                <Text style={styles.packageLabel}>{pkg.label}</Text>
                <Text style={styles.packagePrice}>N {pkg.price.toLocaleString()}</Text>
            </TouchableOpacity>
        ))}
    </View>
);

export default PackageSelector;

const styles = StyleSheet.create({
    packageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        gap:20,
        paddingHorizontal:20
    },
    packageBox: {
        padding: 15,
        backgroundColor: '#222',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:"center",
        flex:1,
        position:"relative",
        gap:10
    },
    selectedPackage: {
        borderColor: '#FFD700',
        borderWidth: 2
    },
    discountText: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 3,
        fontSize: 12,
        fontWeight: 'bold',
        borderRadius: 5,
        marginBottom: 5,
        position:'absolute',
        top:-20
    },
    packageLabel: {
        fontSize: 16,
        width:50,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFF',
        textTransform:"capitalize"
    },
    packagePrice: {
        fontSize: 14,
        color: '#FFF'
    }
});