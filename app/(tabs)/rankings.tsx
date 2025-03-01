import { View, Text, StyleSheet, Pressable, Alert, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import CustomDropdown from '@/componenetsUi/global/CustomDropdown'
import RankCard from '@/componenetsUi/ranks/RankCard'
import PortionSelector from '@/componenetsUi/Home/portionSelector'
import LeaderBoard from '@/componenetsUi/ranks/LeaderBoard'
import LeaderboardTable from '@/componenetsUi/ranks/LeaderboardTable'
import FAQs from '@/componenetsUi/subscription/Faqs'

const Rankings = () => {
  const route = useRouter();
  const [selected, setSelected] = useState('this_week');
  const [selectedPortion, setSelectedPortion] = useState("rankings");
  const dropdownData = [
    { label: 'This Week', value: 'this_week' },
    { label: 'Last 7 days', value: 'last_7_days' },
    { label: 'Last 14 days', value: 'last_14_days' },
    { label: 'Last 21 days', value: 'last_21_days' },
    { label: 'Custom', value: 'custom' },
  ];

  const rankList = [
    {
      "amount": "N 1000",
      "rank": 1
    },
    {
      "amount": "N 800",
      "rank": 2
    },
    {
      "amount": "N 600",
      "rank": 3
    },
    {
      "amount": "N 400",
      "rank": 4
    },
    {
      "amount": "N 200",
      "rank": 5
    },
    {
      "amount": "N 500",
      "rank": 6
    },
  ];
  const handleSelection = (value: string) => {
    setSelectedPortion(value);
  };
  const leaderboardData = [
    { name: 'Sasha', image: 'https://randomuser.me/api/portraits/women/1.jpg', score: 1500, percentage: 90, color: '#1C2E1A', height: 150 },
    { name: 'Adam', image: 'https://randomuser.me/api/portraits/men/1.jpg', score: 2500, percentage: 95, color: '#243B1E', height: 200 },
    { name: 'Adam', image: 'https://randomuser.me/api/portraits/men/2.jpg', score: 1000, percentage: 85, color: '#0000FF33', height: 130 },
  ];
  const leaderboardDataTable = [
    { rank: 4, name: 'Samson', image: 'https://randomuser.me/api/portraits/men/1.jpg', winRate: '84%', points: 987, price: '?' },
    { rank: 5, name: 'Samson', image: 'https://randomuser.me/api/portraits/women/1.jpg', winRate: '84%', points: 987, price: '?' },
    { rank: 6, name: 'Samson', image: 'https://randomuser.me/api/portraits/men/2.jpg', winRate: '84%', points: 987, price: '?' },
    { rank: 6, name: 'Samson', image: 'https://randomuser.me/api/portraits/men/2.jpg', winRate: '84%', points: 987, price: '?' },
    { rank: 6, name: 'Samson', image: 'https://randomuser.me/api/portraits/men/2.jpg', winRate: '84%', points: 987, price: '?' },
    { rank: 6, name: 'Samson', image: 'https://randomuser.me/api/portraits/men/2.jpg', winRate: '84%', points: 987, price: '?' },
  ];
  const faqs = [
    { title: 'How are rewards paid ?', content: 'I Dont Know' },
    { title: 'Can i use any bank', content: 'You can receive your leaderboard rewards anytime into your nigerian bank account.' }
  ];
  return (
    <SafeAreaView>
      <ScrollView>
        <LinearGradient
          colors={['#CFFF0B', '#F9A604']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.navigation}>
              <Pressable style={styles.backBtn} onPress={() => route.back()}>
                <AntDesign name='left' size={28} color={"white"} />
              </Pressable>
              <Text style={styles.heading}>Rankings</Text>
              <CustomDropdown
                data={dropdownData}
                selectedValue={selected}
                onSelect={(value) => setSelected(value)}
              />
            </View>
            <Text style={styles.subtitle}>Contest will end and winners will announced on Sunday</Text>

          </View>
          <View style={styles.rankContainer}>
            <FlatList
              data={rankList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <RankCard amount={item.amount} rank={item.rank} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 20 }}
              scrollEnabled={false}
              removeClippedSubviews={false}
            />
          </View>
        </LinearGradient>

        <View style={styles.gap}>
          <View style={styles.portions}>
            <PortionSelector
              options={[
                { name: "Rankings", value: "rankings" },
                { name: "My Rank", value: "my_rank" },
                { name: "FAQs", value: "faqs" },
              ]}
              onSelect={handleSelection}
              defaultValue={selectedPortion}
            />
          </View>

          {selectedPortion != "faqs" ? (
            <>
              <View style={styles.leaderBoard}>
                {leaderboardData.map((item, index) => (
                  <LeaderBoard key={index} {...item} />
                ))}
              </View>
              <View>
                <LeaderboardTable data={leaderboardDataTable} />
              </View>
            </>
          )
            :
            <FAQs Faqs={faqs} />

          }

        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Rankings

const styles = StyleSheet.create({
  text: {
    color: 'white'
  },
  header: {
    minHeight: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  backBtn: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  subtitle: {
    marginVertical: 10
  },
  rankContainer: {
    marginBlock: 20
  },
  portions: {
    marginBlock: 20
  },
  gap: {
    paddingHorizontal: 20,
  },
  leaderBoard: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBlock: 20
  }
})