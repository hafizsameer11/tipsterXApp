import { Alert, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/componenetsUi/Header';
import DateCircle from '@/componenetsUi/freeTip/DateCircle';
import SortFilter from '@/componenetsUi/freeTip/SortFilter';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import TipCard from '@/componenetsUi/freeTip/TipCard';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '@/contexts/authContext';
import { useQuery } from '@tanstack/react-query';
import { GetTips } from '@/utils/queries/Tip';
import moment from 'moment'; // Import moment.js for date formatting

const ScreenWidth = Dimensions.get("window").width;

type tipJson = {
  id: number;
  user_id: number;
  betting_company_id: number;
  codes: string;
  ods: string;
  status: string;
  result: string;
  match_date: string;
  betting_category: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    username: string;
    profile_picture: string;
    win_rate: string;
    last_five: string[];
  };
};

const FreeTip = () => {
  const [currentWeek, setCurrentWeek] = useState<{ day: string; date: string; fullDate: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const today = new Date();
    const firstDayOfWeek = today.getDate() - today.getDay() + 1; // Start from Monday
    const week = [];

    for (let i = 0; i < 5; i++) { // Monday to Friday
      const date = new Date(today.setDate(firstDayOfWeek + i));
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const fullDate = moment(date).format("YYYY-MM-DD"); // Store full date for filtering
      week.push({ day, date: formattedDate, fullDate });
    }

    setCurrentWeek(week);
    setSelectedDate(week[today.getDay() - 1]?.fullDate || week[0]?.fullDate); // Select today's date or default to Monday
  }, []);

  const { data: tipsData, isLoading, error } = useQuery({
    queryKey: ['tips'],
    queryFn: () => GetTips(token),
  });

  const tipJson = tipsData?.data as tipJson[];

  // **Filter tips based on selected date**
  const filteredTips = tipJson?.filter(tip => moment(tip.created_at).format("YYYY-MM-DD") === selectedDate) || [];

  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={['#003', '#2B2B2B']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <Header profileImage={"https://randomuser.me/api/portraits/men/1.jpg"} rNumber={10} />
          </View>
          <View style={styles.calandarCan}>
            {currentWeek.map((item, index) => (
              <DateCircle
                key={index}
                day={item.day}
                date={item.date}
                isSelected={item.fullDate === selectedDate}
                setSelected={() => setSelectedDate(item.fullDate)}
              />
            ))}
            <View style={[styles.dateCircle, { backgroundColor: 'white' }]}>
              <Image source={require('@/assets/images/Calendar.png')} style={styles.calandarIcon} />
            </View>
          </View>
        </LinearGradient>

        <View style={styles.gap}>
          {/* Filters */}
          <View style={styles.filterCan}>
            <SortFilter
              title='sort'
              subTitle='odds'
              icon='sort-variant'
              bgColor='white'
              onPress={() => Alert.alert('Sort clicked!')}
            />
            <SortFilter
              title='filter'
              subTitle='all'
              icon='filter-variant'
              bgColor='yellow'
              onPress={() => Alert.alert('Filter clicked!')}
            />
          </View>

          {/* Tips List */}
          <FlatList
            data={filteredTips} // Use filtered tips
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TipCard
                lastWin={item.user.last_five}
                winRate={"70%"}
                profile={{
                  name: item.user.username,
                  image: item.user.profile_picture,
                }}
                tipStatus={item.result}
                date={item.match_date}
                odds={item.ods}
                wallet={{
                  name: item.betting_category,
                }}
                code={item.codes}
              />
            )}
            contentContainerStyle={{ gap: 20 }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            ListFooterComponent={<View style={{ marginBottom: 90 }}></View>}
          />
        </View>

        {/* Create Tip Button */}
        {!isLoading && (
          <Link href={'/createTipForm'} style={styles.createpost}>
            <View>
              <Image source={require('@/assets/images/Polygon.png')} style={styles.plusIcon} />
              <AntDesign name='plus' size={30} color={"black"} style={styles.createTip} />
            </View>
          </Link>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default FreeTip;

const styles = StyleSheet.create({
  header: {
    minHeight: 200,
    borderRadius: 30,
  },
  calandarCan: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 5,
    overflow: 'hidden'
  },
  dateCircle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: '#4B4B4B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calandarIcon: {
    width: 30,
    height: 30,
  },
  filterCan: {
    flexDirection: "row",
    gap: 10,
  },
  gap: {
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 20
  },
  tipCan: {
    width: ScreenWidth,
  },
  createpost: {
    position: "absolute", // Use absolute positioning
    bottom: 30, // Stick at the bottom
    right: 20, // Stick to the right
    zIndex: 10, // Ensure it's above other elements
  },
  plusIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  createTip: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
});
