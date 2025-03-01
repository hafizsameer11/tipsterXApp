// Help.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageBubble from '@/componenetsUi/help/MessageBubble';
import InputComponent from '@/componenetsUi/help/InputComponent';
import * as ImagePicker from "expo-image-picker";
import { Feather } from '@expo/vector-icons';

const Help: React.FC = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ id: string; userId: string; text: string; images?: string[] }[]>([
        { id: '1', userId: '123', text: 'Hi, how can I help you today?' },
        { id: '2', userId: '456', text: 'I can’t create tips, what is happening?' },
        { id: '3', userId: '123', text: 'Can you provide more details?',images:[] }
    ]);
    const loginId = '456';

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

    const handleSubmit = () => {
        if (selectedImages.length === 0 && message.trim() === '') {
            Alert.alert("Error", "Type a message or select an image");
            return;
        }
        setMessages([...messages, { id: Date.now().toString(), userId: loginId, text: message, images: selectedImages }]);
        setMessage('');
        setSelectedImages([]);
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={require("@/assets/images/man.png")} style={styles.profileImage} />
                <Text style={styles.profilesText}>TipsterX Support</Text>
            </View>
            <View style={styles.divider} />
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <MessageBubble message={item.text} userId={item.userId} loginId={loginId} images={item.images} />}
                style={styles.chatCan}
            />
            <View style={{position:"relative"}}>
                {selectedImages.length > 0 && (
                    <FlatList
                        data={selectedImages}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={styles.image} />
                        )}
                        contentContainerStyle={{gap:10}}
                        horizontal
                        style={styles.selectImageCan}
                    />
                )}
                <InputComponent message={message} setMessage={setMessage} pickImage={pickImage} handleSubmit={handleSubmit} />
            </View>
        </SafeAreaView>
    );
};

export default Help;

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingHorizontal: 10, flexDirection: "row", gap: 20, alignItems: "center" },
    profileImage: { width: 60, height: 60, borderRadius: 30 },
    profilesText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
    divider: { height: 1, backgroundColor: "#5B5B5B", marginTop: 20 },
    chatCan: { flex: 1, paddingHorizontal: 10 },
    imagePreview: { alignSelf: 'center', marginBottom: 10, position: 'relative' },
    image: { width: 80, height: 80, borderRadius: 10 },
    imageCountOverlay: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 5,
        borderRadius: 10
    },
    imageCountText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    selectImageCan:{
        position:"absolute",
        top:-90,
    }
});
