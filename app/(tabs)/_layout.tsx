import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform, Text } from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import Svg, { Polygon } from 'react-native-svg';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// 🏠 Floating Hexagon Home Button
const FloatingHomeButton = ({ onPress, focused }: { onPress: () => void, focused: boolean }) => (
  <View style={styles.centerContainer}>
    {/* Hexagon Button with SVG */}
    <TouchableOpacity style={styles.hexagonContainer} onPress={onPress} activeOpacity={0.7}>
      <Svg width="70" height="70" viewBox="0 0 100 100">
        <Polygon
          points="50,0 100,25 100,75 50,100 0,75 0,25"
          fill="#111"
          stroke="#FFD700"
          strokeWidth="3"
        />
      </Svg>
      <Ionicons name="home-outline" size={30} color={focused ? "yellow" : 'gray'} style={styles.homeIcon} />
    </TouchableOpacity>
    <Text style={[styles.homeText, { color: focused ? "yellow" : 'gray' }]} onPress={onPress}>Home</Text>
  </View>
);

const VipTipButton = ({focused} : { focused: boolean}) => {
  const navigation = useRouter();

  const handlePress = () => {
    navigation.push('/subscription');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.vipTipButton}>
      <MaterialCommunityIcons name="diamond-stone" size={28} color={focused ? "yellow" : 'gray'} />
      <Text style={[styles.vipTipText, { color: focused ? "yellow" : 'gray' }]}>Vip Tip</Text>
    </TouchableOpacity>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "yellow",
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarIconStyle: {
              marginBottom: 10,
              marginTop: 10
            },
            tabBarLabelStyle: styles.tabBarLabelStyle // Add this line
          }}>

          {/* Free Tips */}
          <Tabs.Screen
            name="freeTip"
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="poker-chip" size={28} color={color} />
              ),
            }}
          />

          {/* VIP Tips */}
          <Tabs.Screen
            name="vipTip"
            options={{
              tabBarButton: ({accessibilityState}) => <VipTipButton focused={accessibilityState?.selected ?? false} />,
              tabBarIcon: () => null,
            }}
          />

          {/* Home (Floating Hexagon) */}
          <Tabs.Screen
            name="index"
            options={{
              tabBarButton: ({ onPress, accessibilityState }) => (
                <FloatingHomeButton onPress={onPress} focused={accessibilityState?.selected ?? false} />
              ),
              tabBarIcon: () => null,
            }}
          />

          {/* Rankings */}
          <Tabs.Screen
            name="rankings"
            options={{
              tabBarIcon: ({ color }) => (
                <Entypo name="bar-graph" size={28} color={color} />
              ),
            }}
          />

          {/* Menu */}
          <Tabs.Screen
            name="menu"
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="menu-outline" size={28} color={color} />
              ),
            }}
          />

        </Tabs>
      {/* </BottomSheetModalProvider> */}
    </GestureHandlerRootView>
  );
}

// 🔹 **Styles**
const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    height: 80,
    backgroundColor: "#1F1F1F",
    borderTopLeftRadius: 20,
    justifyContent: "center",
    borderTopRightRadius: 20,
  },
  centerContainer: {
    position: "absolute",
    top: "-50%",
    left: "50%",
    transform: [{ translateX: "-50%" }],
    alignItems: "center",
  },
  hexagonContainer: {
    width: 70,
    height: 70,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  homeIcon: {
    position: "absolute",
  },
  homeText: {
    position: "absolute",
    top: 75
  },
  vipTipButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop:10
  },
  vipTipText: {
    color: 'white',
    marginTop: 5, // Add margin to position the text below the icon
  },
  tabBarLabelStyle: {
    fontSize: 12,
    marginBottom: 5,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F1F',
    padding: 10,
  },
  titleText: {
    color: 'yellow',
    fontSize: 16,
  },
});