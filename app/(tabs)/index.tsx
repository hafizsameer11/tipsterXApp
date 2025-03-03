import {
  Image, StyleSheet, Text, View, FlatList,
  TextInput, TouchableOpacity, KeyboardAvoidingView,
  Platform, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import PortionSelector from '@/componenetsUi/Home/portionSelector';
import { useCallback, useMemo, useRef, useState } from 'react';
import PostItem from '@/componenetsUi/Home/PostItem';
import { styles } from '@/styles/HomeStyle';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Header from '@/componenetsUi/Header';
import { useAuth } from '@/contexts/authContext';
import { useQuery } from '@tanstack/react-query';
import { fetchAllPosts } from '@/utils/queries/PostQueries';
import { API_BASE_URL_IMG, API_DOMAIN } from '@/utils/apiConfig';

type CommentType = {
  id: string;
  username: string;
  profileImage: string;
  content: string;
  time: string;
  likes: number;
};


export default function HomeScreen() {
  const [selectedPortion, setSelectedPortion] = useState("posts");
  const [SelectCommets, setSelectCommets] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState("");

  const { token, userData } = useAuth();

  const bottomsheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "80%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleCommentPress = (comments: CommentType[]) => {
    console.log("Selected Comments:", comments);
    setSelectCommets(comments);
    bottomsheetRef.current?.snapToIndex(0);
  };

  const handleSelection = (value: string) => {
    setSelectedPortion(value);
  };

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['post'],
    queryFn: () => fetchAllPosts(token),
  });

  const handleCommentSubmit = async () => {
    if (commentText.trim() === "") return;

    try {
      const response = await fetch(`https://tipster.hmstech.org/api/posts/create-comment/${userData?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: commentText,
          post_id: SelectCommets.length > 0 ? SelectCommets[0].id : null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Comment created successfully:", data);
        //close the sheeet
        bottomsheetRef.current?.close();
        setCommentText('');

      } else {
        console.error("Failed to submit comment:", data);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts?.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <PostItem post={item} onCommentPress={handleCommentPress} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ marginTop: 25 }}>
              <Header profileImage={"https://randomuser.me/api/portraits/men/1.jpg"} rNumber={10} />
              <Text style={{ color: "white" }}>{token || "no token"}</Text>
              <PortionSelector
                options={[
                  { name: "Posts", value: "posts" },
                  { name: "Announcements", value: "announcements" },
                ]}
                onSelect={handleSelection}
                defaultValue={selectedPortion}
              />
              <View style={{ height: 20 }} />
            </View>
          }
          ListFooterComponent={<View style={{ height: 100 }} />}
        />

        <Link href={'/createPost'} style={styles.createpost}>
          <View style={styles.createpostCan}>
            <AntDesign name='plus' size={30} color={"black"} />
          </View>
        </Link>
      </SafeAreaView>

      {/* Comments Bottom Sheet */}
      <BottomSheet
        ref={bottomsheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        index={-1}
        backgroundStyle={{ backgroundColor: "#2B2B2B" }}
      >
        <BottomSheetView style={{ flex: 1, padding: 15 }}>
          <Text style={cstyles.commentHeader}>Comments</Text>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={cstyles.commentInputContainer}>
              <TextInput
                style={cstyles.commentInput}
                placeholder="Write a comment..."
                placeholderTextColor="gray"
                value={commentText}
                onChangeText={setCommentText}
              />
              <TouchableOpacity onPress={handleCommentSubmit}>
                <Ionicons name="send" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <FlatList
            data={SelectCommets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={cstyles.commentItem}>
                <Image source={{ uri: API_BASE_URL_IMG + item.profileImage }} style={cstyles.commentProfileImage} />

                <View>
                  <Text style={cstyles.commentUsername}>{item.username}</Text>
                  <Text style={cstyles.commentText}>{item.content}</Text>
                </View>
              </View>
            )}
          />


          {/* Comment Input Field */}

        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

/* Styles */
const cstyles = StyleSheet.create({
  commentHeader: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomColor: "#4f4f4f",
    borderBottomWidth: 4,
    paddingBottom: 20,
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  commentProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentUsername: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  commentText: {
    color: "white",
    fontSize: 12,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
    backgroundColor: "#222",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  commentInput: {
    flex: 1,
    color: "white",
    backgroundColor: "#333",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 10,
  },
});
