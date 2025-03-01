import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import PostInput from "./PostInput";
// import ImagePickerGrid from "./ImagePickerGrid";
import PostInput from "@/componenetsUi/createPost.tsx/postInput";
import ImagePickerGrid from "@/componenetsUi/createPost.tsx/imagePickerGrid";

const CreatePost = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageSelection = (images: string[]) => {
    setSelectedImages(images);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      {/* Header */}

      {/* Post Input */}
      <PostInput />

      {/* Image Picker Grid */}
      <ImagePickerGrid images={selectedImages} onImageSelect={handleImageSelection} />
    </KeyboardAvoidingView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
});
