import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PostInput from "@/componenetsUi/createPost.tsx/postInput";
import ImagePickerGrid from "@/componenetsUi/createPost.tsx/imagePickerGrid";
import { useMutation } from "@tanstack/react-query";
import { AddPost } from "@/utils/mutations/postAdd";
import { useNavigation, useRouter } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { showTopToast } from "@/utils/helpers";
import { useAuth } from "@/contexts/authContext";
import { ApiError } from "@/utils/customApiCall";

const CreatePost = () => {
  const { goBack, navigate, reset } = useNavigation<NavigationProp<any>>();
  const { token,userData } = useAuth();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedContent, setSelectedContent] = useState<string>("");
  const route = useRouter();
  const handleImageSelection = (images: string[]) => {
    setSelectedImages(images);
  };

  const { mutate: handleAddPost, isPending: addPostPending } = useMutation({
    mutationKey: ["addPost"],
    mutationFn: ({ formdata, token }: { formdata: FormData; token: string }) => AddPost(formdata, token),
    onSuccess: async (data) => {
      const result = data?.data;
      console.log("Post added successfully:", result);
      route.push("/(tabs)/freeTip")
    },
    onError: (error: ApiError) => {
      showTopToast({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    },
  });

  const handleSubmit = () => {
    const formdata = new FormData();
    formdata.append("content", selectedContent);
    selectedImages.forEach((image, index) => {
      formdata.append(`images[${index}]`, {
        uri: image,
        type: 'image/jpeg',
        name: `image${index}.jpg`,
      });
    });
    formdata.append("user_id",userData.id.toString());
    handleAddPost({ formdata, token });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} disabled={addPostPending}>
          <Ionicons name="checkmark" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Post Input */}
      <PostInput setSelectedContent={setSelectedContent} />

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
    justifyContent: "space-between",
    paddingBottom: 10,
  },
});