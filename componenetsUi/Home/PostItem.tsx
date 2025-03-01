import React, { useState, useRef, useMemo, useCallback } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Modal,
    FlatList,
    Dimensions
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { Alert } from "react-native";

const { width, height } = Dimensions.get("window");

interface PostItemProps {
    post: {
        username: string;
        time: string;
        profileImage: string;
        content: string;
        likes: number;
        comments: number;
        shares: number;
        views: string;
        isImage?: boolean;
        images?: string[];
        underReview?: boolean;
    };
    onCommentPress: (value: any[]) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onCommentPress }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    // State for BottomSheet visibility

    const handlePress = () => {
        // Pass the comments associated with this post.  If you don't have them
        // already, you'll need to fetch them here.  I'm using a placeholder
        // for now.
        const commentsForThisPost = [
            { id: "1", username: 'Shawn', time: "1h", no_of_like: 10, isliked: true, comment: 'Nice !!' },
            // ... more comments for this post
        ];
        onCommentPress(commentsForThisPost); // Pass the comments to the callback
    };

    const openImageSlider = (index: number) => {
        setSelectedImage(index);
        setCurrentIndex(index);
        setModalVisible(true);
    };

    const handleScroll = (event: any) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(newIndex);
    };

    return (
        <>
            <View style={styles.postContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <Image source={{ uri: post.profileImage }} style={styles.profileImage} />
                        <View>
                            <Text style={styles.username}>{post.username}</Text>
                            <Text style={styles.time}>{post.time}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                        {post.underReview && <Text style={{ backgroundColor: "#FFFF00", padding: 5, paddingInline: 10, borderRadius: 50, opacity: 0.9 }}>Under Review</Text>}
                        <Ionicons name="ellipsis-vertical" size={20} color="white" />
                    </View>
                </View>

                {/* Content */}
                <Text style={styles.content}>{post.content}</Text>

                {/* Image Grid */}
                {post.isImage && post.images && post.images.length > 0 && (
                    <View style={styles.imageGrid}>
                        {post.images.length === 1 ? (
                            <TouchableOpacity onPress={() => openImageSlider(0)}>
                                <Image source={{ uri: post.images[0] }} style={styles.fullWidthImage} />
                            </TouchableOpacity>
                        ) : post.images.length === 3 ? (
                            <View style={styles.threeImagesGrid}>
                                <TouchableOpacity onPress={() => openImageSlider(0)} style={styles.largeImageWrapper}>
                                    <Image source={{ uri: post.images[0] }} style={styles.largeImage} />
                                </TouchableOpacity>
                                <View style={styles.smallImagesWrapper}>
                                    <TouchableOpacity onPress={() => openImageSlider(1)} style={styles.smallImageWrapper}>
                                        <Image source={{ uri: post.images[1] }} style={styles.smallImage} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => openImageSlider(2)} style={styles.smallImageWrapper}>
                                        <Image source={{ uri: post.images[2] }} style={styles.smallImage} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.twoColumnGrid}>
                                {post.images.slice(0, 4).map((image, index) => (
                                    <TouchableOpacity key={index} onPress={() => openImageSlider(index)} style={styles.imageWrapper}>
                                        <Image source={{ uri: image }} style={styles.gridImage} />
                                        {post.images.length > 4 && index === 3 && (
                                            <View style={styles.overlay}>
                                                <Text style={styles.overlayText}>+{post.images.length - 4}</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                )}

                {/* Post Actions */}
                <View style={styles.actions}>
                    <View style={styles.actionItem}>
                        <AntDesign name="like2" size={20} color="white" />
                        <Text style={styles.actionText}>{post.likes}</Text>
                    </View>
                    <View style={styles.actionItem}>
                        <TouchableOpacity style={styles.actionItem} onPress={() => {
                            handlePress()
                        }}>
                            <FontAwesome name="comment-o" size={20} color="white" />
                            <Text style={styles.actionText}>{post.comments}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.actionItem}>
                        <FontAwesome name="share" size={20} color="white" />
                        <Text style={styles.actionText}>{post.shares}</Text>
                    </View>
                    <View style={styles.actionItem}>
                        <FontAwesome name="eye" size={20} color="white" />
                        <Text style={styles.actionText}>{post.views}</Text>
                    </View>
                </View>

                {/* Full-Screen Image Slider Modal */}
                <Modal visible={modalVisible} transparent={true} animationType="fade">
                    <View style={styles.modalBackground}>
                        <FlatList
                            data={post.images}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            initialScrollIndex={selectedImage}
                            getItemLayout={(data, index) => ({
                                length: width,
                                offset: width * index,
                                index,
                            })}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <Image source={{ uri: item }} style={styles.fullscreenImage} />
                            )}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                        />

                        {/* Dynamic Pagination Dots */}
                        {post.isImage && post.images && post.images.length > 1 && <View style={styles.pagination}>
                            {post.images?.map((_, index) => (
                                <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
                            ))}
                        </View>}

                        {/* Close Button */}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Ionicons name="close-circle" size={40} color="white" />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </>
    );
};

export default PostItem;

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: "#222",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    username: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    time: {
        color: "gray",
        fontSize: 12,
    },
    content: {
        color: "white",
        marginTop: 10,
    },
    imageGrid: {
        marginTop: 10,
    },
    fullWidthImage: {
        width: "100%",
        height: 200,
        borderRadius: 8,
    },
    threeImagesGrid: {
        flexDirection: "row",
        gap: 5,
    },
    largeImageWrapper: {
        flex: 2,
    },
    largeImage: {
        width: "100%",
        height: 180,
        borderRadius: 8,
    },
    smallImagesWrapper: {
        flex: 1,
        justifyContent: "space-between",
    },
    smallImageWrapper: {
        flex: 1,
    },
    smallImage: {
        width: "100%",
        height: 87,
        borderRadius: 8,
    },
    twoColumnGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    },
    gridImage: {
        width: "100%",
        height: 120,
        borderRadius: 8,
    },
    imageWrapper: {
        flexBasis: "48%",
        position: "relative",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 120,
        borderRadius: 8,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    overlayText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        paddingVertical: 10,
    },
    actionItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    actionText: {
        color: "white",
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    fullscreenImage: {
        width: width,
        height: height,
        resizeMode: "contain",
    },
    pagination: {
        position: "absolute",
        bottom: "20%",
        flexDirection: "row",
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "yellow",
        padding: 5,
        borderRadius: 10
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "gray",
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: "yellow",
    },
    closeButton: {
        position: "absolute",
        top: 20,
        right: 20,
    },
});
