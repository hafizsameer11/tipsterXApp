import { Image, StyleSheet, Text, View, Alert, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import PortionSelector from '@/componenetsUi/Home/portionSelector';
import { useCallback, useMemo, useRef, useState } from 'react';
import PostItem from '@/componenetsUi/Home/PostItem';
import { styles } from '@/styles/HomeStyle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import Header from '@/componenetsUi/Header';

const posts = [
  {
    "id": 1,
    "username": "Dante",
    "profileImage": "https://i.pravatar.cc/101",
    "time": "10:22 AM - 1/1/25",
    "content": "I think playing these games at these period can be very profitable...",
    "likes": 200,
    "comments": 120,
    "shares": 200,
    "views": "2.5k",
    "isImage": true,
    "images": [
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTuuKpIqgOelRRKpnwrhZJTOodmTrVrM78jxZLZ85i1br-bC7Qz",
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9lzboWcKDlhRA-YqCZxo_aF5EomSyB2ZPLd60T7cWkdWx7sbZ",
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQRrcwWKNg6NgkaTAR8_NjircWBh7p2yvMoNAQ7oZVEea9aShha"
    ],
    "underReview": true
  },
  {
    "id": 2,
    "username": "Vergil",
    "profileImage": "https://i.pravatar.cc/102",
    "time": "8:30 AM - 2/1/25",
    "content": "This is a random post without images.",
    "likes": 150,
    "comments": 80,
    "shares": 90,
    "views": "1.2k"
  },
  {
    "id": 3,
    "username": "Sephiroth",
    "profileImage": "https://i.pravatar.cc/103",
    "time": "9:45 AM - 3/1/25",
    "content": "I think playing these games at these period can be very profitable...",
    "likes": 180,
    "comments": 110,
    "shares": 160,
    "views": "1.9k",
    "isImage": true,
    "images": [
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTuuKpIqgOelRRKpnwrhZJTOodmTrVrM78jxZLZ85i1br-bC7Qz",
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9lzboWcKDlhRA-YqCZxo_aF5EomSyB2ZPLd60T7cWkdWx7sbZ"
    ]
  },
  {
    "id": 4,
    "username": "Cloud",
    "profileImage": "https://i.pravatar.cc/104",
    "time": "7:15 AM - 4/1/25",
    "content": "One image only, so it should be full width.",
    "likes": 210,
    "comments": 130,
    "shares": 250,
    "views": "3.1k",
    "isImage": true,
    "images": [
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTuuKpIqgOelRRKpnwrhZJTOodmTrVrM78jxZLZ85i1br-bC7Qz"
    ]
  },
  {
    "id": 5,
    "username": "Admin",
    "profileImage": "https://i.pravatar.cc/104",
    "time": "7:15 AM - 4/1/25",
    "content": "One image only, so it should be full width.",
    "likes": 210,
    "comments": 130,
    "shares": 250,
    "views": "3.1k",
    "isImage": true,
    "images": [
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTuuKpIqgOelRRKpnwrhZJTOodmTrVrM78jxZLZ85i1br-bC7Qz",
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9lzboWcKDlhRA-YqCZxo_aF5EomSyB2ZPLd60T7cWkdWx7sbZ",
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQRrcwWKNg6NgkaTAR8_NjircWBh7p2yvMoNAQ7oZVEea9aShha",
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTuuKpIqgOelRRKpnwrhZJTOodmTrVrM78jxZLZ85i1br-bC7Qz",
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9lzboWcKDlhRA-YqCZxo_aF5EomSyB2ZPLd60T7cWkdWx7sbZ",
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQRrcwWKNg6NgkaTAR8_NjircWBh7p2yvMoNAQ7oZVEea9aShha",
    ]
  }
]

type coments = {
  username: string;
  time: string;
  profileImage: string;
  content: string;
  likes: number;
  comment: number;
  shares: number;
  views: string;
  isImage?: boolean;
  images?: string[];
  underReview?: boolean;
}
export default function HomeScreen() {
  const [selectedPortion, setSelectedPortion] = useState("posts");
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [SelectCommets, setSelectCommets] = useState<coments[]>()


  const bottomsheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "90%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleCommentPress = (comments: any[]) => {
    console.log(comments)
    setSelectCommets(comments)
    setIsBottomSheetVisible(true); // Show BottomSheet
    bottomsheetRef.current?.snapToIndex(0); // Optionally snap to a point
  };

  const handleSelection = (value: string) => {
    setSelectedPortion(value);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => item.id.toString() + index}
          renderItem={({ item }) => <PostItem post={item} onCommentPress={handleCommentPress} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ marginTop: 25 }}>
              {/* Header */}
              <Header profileImage={"https://randomuser.me/api/portraits/men/1.jpg"} rNumber={10} />

              {/* Portion Selector */}
              <PortionSelector
                options={[
                  { name: "Posts", value: "posts" },
                  { name: "Announcements", value: "announcements" },
                ]}
                onSelect={handleSelection}
                defaultValue={selectedPortion}
              />

              {/* Spacing */}
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
      <BottomSheet
        ref={bottomsheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChanges}
        style={{ backgroundColor: "#2B2B2B" }}
        enablePanDownToClose={true}
        index={-1}
        backgroundStyle={{ backgroundColor: "" }}
      >
        <BottomSheetView style={{ flex: 1, padding: 15 }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", textAlign: "center", borderBottomColor: "#4f4f4f", borderBottomWidth: 4, paddingBottom: 20 }}>Comments</Text>
          {SelectCommets?.map((item, index) => (
            <View key={index} style={{ padding: 15 }}>
              <Text style={{ color: "white" }}>{item.comment}</Text>
            </View>
          ))}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

