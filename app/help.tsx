import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';
import MessageBubble from '@/componenetsUi/help/MessageBubble';
import InputComponent from '@/componenetsUi/help/InputComponent';
import * as ImagePicker from "expo-image-picker";
import axios from 'axios';
import { useAuth } from '@/contexts/authContext';

const API_BASE_URL = "https://tipster.hmstech.org/api"; // Backend URL

const Help: React.FC = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const loginId = '456';
    const chatId = '1'; // Static chat ID for testing
    const { token, user } = useAuth();

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/message/${chatId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data); // Ensure correct format
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "We need access to your photos to select images.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled && result.assets.length > 0) {
            setSelectedImages([...selectedImages, result.assets[0].uri]);
        }
    };

    const handleSubmit = async () => {
        if (!token) {
            Alert.alert("Error", "Authentication token is missing.");
            return;
        }

        if (selectedImages.length === 0 && message.trim() === '') {
            Alert.alert("Error", "Type a message or select an image");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('chat_id', chatId);
            formData.append('sender_type', 'user');
            formData.append('content', message);

            selectedImages.forEach((imageUri, index) => {
                formData.append(`attachment`, {
                    uri: imageUri,
                    name: `image_${index}.jpg`,
                    type: 'image/jpeg',
                });
            });

            const response = await axios.post(`${API_BASE_URL}/message/send`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.data) {
                setMessages([...messages, response.data.data]);
            }

            setMessage('');
            setSelectedImages([]);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={require("@/assets/images/man.png")} style={styles.profileImage} />
                <Text style={styles.profilesText}>TipsterX Support</Text>
            </View>
            <View style={styles.divider} />

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#FFD700" />
                ) : (
                    <FlatList
                        data={messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <MessageBubble 
                                message={item.content} 
                                userId={item.sender_type} 
                                loginId={loginId} 
                                images={item.attachment ? [item.attachment] : []} 
                            />
                        )}
                        style={styles.chatCan}
                        keyboardShouldPersistTaps="handled"
                    />
                )}

                {selectedImages.length > 0 && (
                    <FlatList
                        data={selectedImages}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={styles.image} />
                        )}
                        horizontal
                        style={styles.selectImageCan}
                    />
                )}

                <InputComponent message={message} setMessage={setMessage} pickImage={pickImage} handleSubmit={handleSubmit} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Help;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#222' },
    header: { paddingHorizontal: 10, flexDirection: "row", gap: 20, alignItems: "center" },
    profileImage: { width: 60, height: 60, borderRadius: 30 },
    profilesText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
    divider: { height: 1, backgroundColor: "#5B5B5B", marginTop: 20 },
    chatCan: { flex: 1, paddingHorizontal: 10 },
    image: { width: 80, height: 80, borderRadius: 10 },
    selectImageCan: { position: "absolute", top: -90 }
});
