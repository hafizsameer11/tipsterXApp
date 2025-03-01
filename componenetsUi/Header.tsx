import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  profileImage: string;
  rNumber: number;
  notHeaderShown?: boolean
}

const Header: React.FC<HeaderProps> = ({ profileImage, rNumber, notHeaderShown }) => {
  const router = useRouter()
  return (
    <View style={styles.header}>
      {!notHeaderShown && <Image source={require("@/assets/logo.png")} style={styles.logo} />}

      {notHeaderShown && <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <AntDesign name='left' size={30} color={"white"} />
      </Pressable>}
      <View style={styles.headerRight}>
        <View style={styles.rCan}>
          <Text style={styles.r}>R</Text>
          <Text style={styles.rNumber}>{rNumber}</Text>
        </View>

        <Image source={{ uri: profileImage }} style={styles.headerProfile} />

        <Link href={"/notification"} style={styles.headerNotifitcation}>
          <Ionicons name="notifications" size={25} color="white" />
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
    paddingBlock: 20,
  },
  logo: {
    maxWidth: 100,
    height: 60,
    objectFit: "contain",
  },
  headerRight: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  rCan: {
    backgroundColor: "#3f3f3f",
    padding: 10,
    paddingBlock: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  r: {
    color: 'black',
    backgroundColor: "#FFFF00",
    paddingInline: 15,
    paddingBlock: 5,
    borderRadius: 10,
    fontWeight: 900,
    fontSize: 20
  },
  rNumber: {
    color: "white",
    fontSize: 15,
    paddingInline: 10,
    paddingBlock: 5,
    fontWeight: 900
  },
  headerProfile: {
    width: 53,
    height: 53,
    borderRadius: 10
  },
  headerNotifitcation: {
    paddingInline: 15,
    paddingBlock: 15,
    borderRadius: 10,
    backgroundColor: "#3f3f3f"
  },
  backBtn: {
    backgroundColor: "#2B2B2B",
    width: 60,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Header;
