import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { styles } from '@/styles/getStarted'
import { LinearGradient } from 'expo-linear-gradient'
import { router, useNavigation } from 'expo-router'
import { NavigationProp } from '@react-navigation/native'



const index = () => {
    const { navigate, reset } = useNavigation<NavigationProp<any>>();
    return (
        <LinearGradient
            colors={['#FFFF00', '#745B06']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <Image source={require("@/assets/main/logo.png")} style={styles.logo} />

            <View style={styles.buttoncan}>
                <Pressable style={styles.buttonCan} onPress={() => router.push('/login')}>
                    <Text style={styles.button}>Get Start</Text>
                </Pressable>
            </View>
        </LinearGradient>
    )
}

export default index