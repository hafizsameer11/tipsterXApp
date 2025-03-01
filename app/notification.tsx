import { View, Text, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PortionSelector from '@/componenetsUi/Home/portionSelector'
import { FontAwesome6 } from '@expo/vector-icons'
import { FlatList } from 'react-native-gesture-handler'

const Notification = () => {
    const [selectedPortion, setSelectedPortion] = useState("all");

    const handleSelection = (value: string) => {
        setSelectedPortion(value);
    };
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <PortionSelector
                    options={[
                        { name: "All", value: "all" },
                        { name: "Social", value: "social" },
                        { name: "Others", value: "others" },
                    ]}
                    onSelect={handleSelection}
                    defaultValue={selectedPortion}
                />
                <View style={styles.notificationCard}>
                    {/* Icon */}
                    <View style={styles.iconContainer}>
                        <FontAwesome6 name="thumbs-up" size={20} color={"#FFFF00"} />
                    </View>

                    {/* Notification Details */}
                    <View style={styles.detailsContainer}>
                        {/* Title & Date */}
                        <View style={styles.row}>
                            <Text style={styles.title}>Post Like</Text>
                            <Text style={styles.date}>01/01/2025 - 11:22 AM</Text>
                        </View>

                        {/* Likes Info */}
                        <Text style={styles.likes}>
                            <Text style={styles.highlight}>Adam + 5 others</Text> liked your post
                        </Text>

                        {/* Post Excerpt */}
                        <Text style={styles.postExcerpt}>
                            This betting has helped me in so many ways but............
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Notification


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    notificationCard: {
        backgroundColor: "#2B2B2B",
        padding: 15,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 15,
        width: "100%",
        marginBlock: 20
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#494916",
        justifyContent: "center",
        alignItems: "center",
    },
    detailsContainer: {
        flex: 1,
        gap: 5,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    date: {
        color: "#FFFF00",
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "right",
    },
    likes: {
        color: "white",
        fontSize: 14,
    },
    highlight: {
        color: "#FFFF00",
        fontWeight: "bold",
    },
    postExcerpt: {
        color: "white",
        fontSize: 14,
        marginTop: 5,
    },
})