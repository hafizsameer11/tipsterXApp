import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type PackageProps = {
    selectedPackage: number;
    setSelectedPackage: (pkg: number) => void;
    packages: {
        id: number;
        title: string;
        duration: string;
        amount: string;
        created_at: string;
        updated_at: string;
    }[];
};


const PackageSelector: React.FC<PackageProps> = ({ selectedPackage, packages, setSelectedPackage }) => (
    <View style={styles.packageContainer}>
        {packages.map((pkg) => (
            <TouchableOpacity
                key={pkg.id}
                style={[styles.packageBox, selectedPackage === pkg.id && styles.selectedPackage]}
                onPress={() => setSelectedPackage(pkg.id)}
            >
                {pkg?.discount && <Text style={styles.discountText}>{pkg?.discount}</Text>}
                <Text style={styles.packageLabel}>1</Text>
                <Text style={styles.packageLabel}>{pkg.title}</Text>
                <Text style={styles.packagePrice}>N {pkg.amount}</Text>
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
        gap: 20,
        paddingHorizontal: 20
    },
    packageBox: {
        paddingVertical:10 ,
        backgroundColor: '#222',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "center",
        flex: 1,
        position: "relative",
        gap: 10
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
        position: 'absolute',
        top: -20
    },
    packageLabel: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFF',
        textTransform: "capitalize",
        wordWrap: 'keep-all'
    },
    packagePrice: {
        fontSize: 14,
        color: '#FFF'
    },
});