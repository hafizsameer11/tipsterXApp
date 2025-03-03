import { Pressable, StyleSheet, Text, View, FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";

// Sample Categories List
const categories = [
    { id: 1, name: "Football" },
    { id: 2, name: "Basketball" },
    { id: 3, name: "Volleyball" },
    { id: 4, name: "Cycling" },
    { id: 5, name: "Golf" },
];

const CategoryDropDown = ({ onSelect }: { onSelect: (categories: string[]) => void }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    const toggleCategory = (id: number) => {
        setSelectedCategories(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(catId => catId !== id)
                : [...prevSelected, id]
        );
    };

    const handleGesture = ({ nativeEvent }: any) => {
        if (nativeEvent.translationY > 50) {
            setModalVisible(false);
        }
    };

    const handleSelect = () => {
        const selectedCategoryNames = categories
            .filter(cat => selectedCategories.includes(cat.id))
            .map(cat => cat.name);
        console.log("selected categories : ",selectedCategoryNames);
        onSelect(selectedCategoryNames);
        setModalVisible(false);
    };

    return (
        <>
            {/* Drop-down Button */}
            <Pressable style={styles.container} onPress={() => setModalVisible(true)}>
                <Text style={styles.categoryText}>
                    {selectedCategories.length > 0
                        ? `Selected (${selectedCategories.length})`
                        : "Select Category"}
                </Text>
                <AntDesign name="down" size={20} color={"white"} />
            </Pressable>

            {/* Modal */}
            <Modal visible={modalVisible} transparent={true} animationType="fade">
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalBackground}>
                        <PanGestureHandler onGestureEvent={handleGesture}>
                            <View style={styles.modalContainer}>
                                {/* Modal Handle */}
                                <View style={styles.modalHandle} />

                                {/* Categories List */}
                                <FlatList
                                    data={categories}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.listItem}
                                            onPress={() => toggleCategory(item.id)}
                                        >
                                            <Text style={styles.categoryText}>{item.name}</Text>
                                            {selectedCategories.includes(item.id) && (
                                                <AntDesign name="checksquare" size={20} color="yellow" />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                />
                                <Pressable style={styles.selectButton} onPress={handleSelect}>
                                    <Text style={styles.selectButtonText}>Select</Text>
                                </Pressable>
                            </View>
                        </PanGestureHandler>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

export default CategoryDropDown;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#2B2B2B",
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
    },
    categoryText: {
        fontSize: 16,
        color: "white",
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#2B2B2B",
        width: "100%",
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    modalHandle: {
        width: 100,
        height: 4,
        backgroundColor: "white",
        alignSelf: "center",
        marginBottom: 10,
        borderRadius: 5,
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#444",
    },
    selectButton: {
        backgroundColor: "yellow",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    selectButtonText: {
        color: "black",
        fontWeight: "bold",
    },
});