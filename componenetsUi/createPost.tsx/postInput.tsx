import React from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";

const PostInput = () => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputBox}>
        <Image source={{ uri: "https://i.pravatar.cc/100" }} style={styles.profileImage} />
        <Text style={styles.username}>Alucard</Text>
      </View>
      <TextInput placeholder="Start typing" placeholderTextColor="gray" style={styles.textInput} multiline />
    </View>
  );
};

export default PostInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor:"#1f1f1f",
    borderRadius:10,
    padding:20
  },
  profileImage: {
    width:50,
    height:50,
    borderRadius:80
  },
  inputBox: {
    // flex: 1,
    flexDirection: "row",
    alignItems:"flex-start",
    gap:10
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop:10
    // marginBottom: 5,
  },
  textInput: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    minHeight: 200, // Set a minimum height
    textAlignVertical: "top", // Ensures text starts from the top
  },
});
