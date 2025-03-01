// MessageBubble.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList } from 'react-native';

type MessageBubbleProps = {
    message?: string;
    userId: string;
    loginId: string;
    images?: string[];
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, userId, loginId, images }) => {
    const isUserMessage = userId === loginId;
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={[styles.container, isUserMessage ? styles.userContainer : styles.otherContainer]}>
            {images && images.length > 0 && (
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image source={{ uri: images[0] }} style={styles.image} />
                    {images.length > 1 && (
                        <View style={styles.imageCountOverlay}>
                            <Text style={styles.imageCountText}>+{images.length - 1}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            ) }
            {message ? (
                <Text style={[styles.messageText, !isUserMessage && styles.otherText ]}>{formatMessage(message)}</Text>
            ) : null }
            <Text style={styles.timestamp}>12:22 AM</Text>

            {/* Image Slider Modal */}
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <FlatList
                        data={images}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={styles.fullImage} />
                        )}
                        style={{maxHeight:350}}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const formatMessage = (text: string): string => {
    return text.replace(/(.{35})/g, "$1\n");
};

export default MessageBubble;

const styles = StyleSheet.create({
    container: {
        maxWidth: '75%',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    userContainer: {
        backgroundColor: '#FFD700',
        alignSelf: 'flex-end',
    },
    otherContainer: {
        backgroundColor: '#333',
        alignSelf: 'flex-start',
    },
    messageText: {
        color: '#000',
        fontSize: 16,
    },
    timestamp: {
        fontSize: 10,
        color: '#AAA',
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    otherText: {
        color: '#FFF',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 5,
    },
    imageCountOverlay: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 5,
        borderRadius: 10
    },
    imageCountText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: 300,
        height: 300,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    }
});
