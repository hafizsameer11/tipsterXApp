import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, Octicons } from '@expo/vector-icons'
import { styles } from '@/styles/menustyle'
import Item from '@/componenetsUi/menu/Item'
import { router, useNavigation } from 'expo-router'
import { useAuth } from '@/contexts/authContext'
import { API_Images_Domain } from '@/utils/apiConfig'
import { NavigationProp } from '@react-navigation/native'

const Menu = () => {
  const { userData } = useAuth();
  const { navigate, reset } = useNavigation<NavigationProp<any>>();

  const handleProfile = (id: number) => {
    navigate("profile", {
      context: "signup",
      userId: id,
    });
  }

  const menulist = [
    {
      title: "Edit Profile",
      icon: "user",
      iconBg: "#FF0B69",
      navigatingLink: "/edit",
      iconType: 'AntDesign'
    },
    {
      title: "Manage Subscriptions",
      icon: "diamond",
      iconBg: "#0BBAFF",
      navigatingLink: "/subscription",
      iconType: 'FontAwesome'
    },
    {
      title: "Notification",
      icon: "bell",
      iconBg: "#FF990B",
      navigatingLink: "/notification",
      iconType: 'FontAwesome5'
    },
    {
      title: "Transaction History",
      icon: "event-note",
      iconBg: "#91FF0B",
      navigatingLink: "/transitionHistory",
      iconType: 'MaterialIcons'
    },
    {
      title: "Help Center",
      icon: "headphones-alt",
      iconBg: "#C20BFF",
      navigatingLink: "/help",
      iconType: 'FontAwesome5'
    },
  ]

  return (
    <SafeAreaView>
      <ScrollView>
        <LinearGradient
          colors={['#CFFF0B', '#1CE5C3']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ minHeight: 200 }}
        >
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <AntDesign name='left' size={30} color={"white"} />
          </Pressable>
          <View style={styles.header}>
            <Image source={{ uri: API_Images_Domain + userData?.profile_picture }} style={styles.profileImage} />
            <View style={{ gap: 10 }}>
              <Text style={styles.h1}>{userData.username}</Text>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: "center" }}>
                {userData?.vip_status == 'active' && <><View style={styles.badge}>
                  <Image source={require('@/assets/images/diamond.png')} style={styles.badgeImage} />
                  <Text style={styles.badgeText}>
                    Vip
                  </Text>
                </View>
                  <View style={{ width: 5, height: 5, backgroundColor: "white", borderRadius: 5 }}></View>
                </>
                }
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    200 followers
                  </Text>
                </View>
              </View>
              {userData?.vip_status == 'active' && <View style={styles.subcription}>
                <Octicons name='verified' size={20} color={"black"} />
                <Text>
                  Subscription Active
                </Text>
              </View>}
            </View>
          </View>
        </LinearGradient>
        <View style={styles.menuItem}>
          <Pressable onPress={()=>handleProfile(userData?.id)} style={styles.item}>
            <View style={styles.item}>
              <View style={[styles.ItemIcon, { backgroundColor: '#FFFF00' }]}>
                <AntDesign name={'eyeo'} size={30} color={"black"} />
              </View>
              <Text style={styles.itemText}>View Profile</Text>
            </View>
          </Pressable>
          {menulist.map((item, index) => (
            <Item
              key={index}
              title={item.title}
              icon={item.icon}
              iconBg={item.iconBg}
              navigatingLink={item.navigatingLink}
              iconType={item.iconType}
            />
          ))}
        </View>
        <View style={[styles.footer, { marginBottom: 150 }]}>
          <Pressable style={styles.footerbtn}>
            <Text style={styles.footerbtnText}>Logout</Text>
          </Pressable>
          <Pressable style={[styles.footerbtn, { borderColor: "#2B2B2B" }]}>
            <Text style={styles.footerbtnText}>Delete Account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Menu