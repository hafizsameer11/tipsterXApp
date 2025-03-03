import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/authContext';
import { API_Images_Domain } from '@/utils/apiConfig';

interface HeaderProps {
  profileImage: string;
  rNumber: number;
  notHeaderShown?: boolean;
}

const Header: React.FC<HeaderProps> = ({ profileImage, rNumber, notHeaderShown }) => {
  const router = useRouter();
  const { userData } = useAuth();
  
  return (
    <View style={styles.header}>
      {/* Larger Logo */}
      {!notHeaderShown && <Image source={require("@/assets/logo.png")} style={styles.logo} />}
      
      {notHeaderShown && (
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <AntDesign name="left" size={22} color="white" />
        </Pressable>
      )}

      {/* Right Section */}
      <View style={styles.headerRight}>
        <View style={styles.rCan}>
          <Text style={styles.r}>R</Text>
          <Text style={styles.rNumber}>{rNumber}</Text>
        </View>

        <Image source={{ uri: API_Images_Domain + userData?.profile_picture }} style={styles.headerProfile} />

        <Link href={"/notification"} style={styles.headerNotifitcation}>
          <Ionicons name="notifications" size={20} color="white" />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    gap:30,
  },
  logo: {
    maxWidth: 100, // Increased logo size
    height: 50,
    resizeMode: "contain",
  },
  headerRight: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  rCan: {
    backgroundColor: "#3f3f3f",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  r: {
    color: "black",
    backgroundColor: "#FFFF00",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: "bold",
    fontSize: 12, // Reduced size
  },
  rNumber: {
    color: "white",
    fontSize: 12, // Reduced size
    paddingHorizontal: 6,
    fontWeight: "bold",
  },
  headerProfile: {
    width: 40, // Reduced profile image size
    height: 40,
    borderRadius: 8,
  },
  headerNotifitcation: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#3f3f3f",
  },
  backBtn: {
    backgroundColor: "#2B2B2B",
    width: 50, // Smaller back button
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Header;
