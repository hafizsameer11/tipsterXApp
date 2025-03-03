import { Image, Pressable, ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PortionSelector from '@/componenetsUi/Home/portionSelector';
import DropdownSelect from '@/componenetsUi/profile/DropdownSelect';
import StatCard from '@/componenetsUi/profile/StatCard';
import WinRateChart from '@/componenetsUi/profile/WinRateChart';
import TipCard from '@/componenetsUi/freeTip/TipCard';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/utils/queries/Profile';
import { useAuth } from '@/contexts/authContext';
import { API_Images_Domain } from '@/utils/apiConfig';

const Profile = () => {
    const router = useRouter();
    const [selectedPortion, setSelectedPortion] = useState("performance");
    const [selectedRange, setSelectedRange] = useState<string>("30");
    const route = useRoute();
    const { token } = useAuth();
    const { context, userId } = route.params as { context: string; userId: number; };

    console.log("user profile id", userId);
    const { data: profileData, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile(userId, token),
    });
    console.log(profileData?.data);
    const UserProfile = profileData?.data;

    const portion = [
        { name: "Performance", value: "performance" },
        { name: "Pending", value: "running" },
        { name: "Won", value: "won" },
        { name: "Lost", value: "lost" },
    ];

    const statsData = [
        { title: "Total Wins", subtitle: "Last 30 days", value: UserProfile?.total_wins },
        { title: "Last 5 Wins", subtitle: "Last 30 days", value: "", icons: UserProfile?.last_five },
        { title: "Average Odds", subtitle: "Last 30 days", value: UserProfile?.average_odds },
        { title: "Total Predictions", subtitle: "Last 30 days", value: UserProfile?.total_predictions },
    ];
    const [filteredTips, setFilteredTips] = useState(UserProfile?.tips);

    const filterTips = (tips: any[], status: string, range: string) => {
        const now = new Date();
        const filteredTips = tips.filter(tip => {
            const matchDate = new Date(tip.match_date);
            const diffDays = Math.ceil((now.getTime() - matchDate.getTime()) / (1000 * 3600 * 24));
            return tip.result === status && diffDays <= parseInt(range);
        });
        setFilteredTips(filteredTips);
    };

    const handleSelection = (value: string) => {
        setSelectedPortion(value);
        if (value === "pending" || value === "won" || value === "lost") {
            filterTips(UserProfile?.tips, value, selectedRange);
        }else {
            setFilteredTips(UserProfile?.tips);
        }
    };

    // const filteredTips = filterTips(UserProfile?.tips || [], selectedPortion, selectedRange);


    return (
        <ScrollView style={{ flex: 1 }}>
            <SafeAreaView>
                <LinearGradient
                    colors={['#CFFF0B', '#1CE5C3']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ height: 120, position: "sticky", top: 0 }}
                >
                    <View style={{ flexDirection: 'row', alignItems: "center", position: 'relative' }}>
                        <Pressable style={styles.backBtn} onPress={() => router.back()}>
                            <AntDesign name='left' size={30} color={"white"} />
                        </Pressable>
                        <Text style={styles.headerHead}>Profile</Text>
                    </View>
                    <Image source={{ uri: API_Images_Domain + UserProfile?.user.profile_picture }} style={styles.profileImage} />
                </LinearGradient>
                <View style={{ paddingHorizontal: 20, gap: 20 }}>
                    <View style={styles.profileInfo}>
                        <View style={styles.usernameCan}>
                            <Text style={styles.username}>Alucard</Text>
                            <Image source={require("@/assets/images/diamond.png")} style={styles.perimumBadge} />
                        </View>
                        <View style={styles.statsCan}>
                            <View style={styles.stat}>
                                <Text style={styles.statText}>20</Text>
                                <Text style={styles.statText}>Subscribers</Text>
                            </View>
                            <View style={{ width: 5, height: 5, backgroundColor: "white", borderRadius: 5 }} />
                            <View style={styles.stat}>
                                <Text style={styles.statText}>200</Text>
                                <Text style={styles.statText}>Followers</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bioCan}>
                        <Text style={styles.headingBio}>Bio</Text>
                        <Text style={[styles.headingBio, styles.bio]}>
                            I have a lot of experience in predicting sure games , my
                            record speaks for me
                        </Text>
                    </View>

                    <Pressable style={styles.FollowBtn}>
                        <Feather name="user-check" size={28} color={"black"} />
                        <Text style={styles.followBtnText}>Follow Alucard</Text>
                    </Pressable>
                    <Pressable style={[styles.FollowBtn, { backgroundColor: "white" }]}>
                        <MaterialIcons name="notifications-on" size={28} color={"black"} />
                        <Text style={[styles.followBtnText, { color: "black" }]}>Subscribe to user notification</Text>
                    </Pressable>

                    <View style={{ marginTop: 50 }}>
                        <PortionSelector
                            options={portion}
                            onSelect={handleSelection}
                            defaultValue={selectedPortion}
                        />
                    </View>

                    <DropdownSelect
                        title="Last 30 days"
                        options={[
                            { label: "Last 7 days", value: "7" },
                            { label: "Last 30 days", value: "30" },
                            { label: "Last 60 days", value: "60" },
                            { label: "Last 90 days", value: "90" },
                        ]}
                        onSelect={(value) => setSelectedRange(value)}
                    />

                    <View>
                        {!isLoading && <WinRateChart winRates={UserProfile?.graphicalData} overallWinRate={UserProfile?.win_rate} />}
                    </View>

                    <View>
                        <FlatList
                            data={statsData}
                            keyExtractor={(item) => item.title}
                            numColumns={2}
                            renderItem={({ item }) => (
                                <StatCard title={item.title} subtitle={item.subtitle} value={item.value} icons={item.icons} />
                            )}
                            scrollEnabled={false}
                            removeClippedSubviews={true}
                        />
                    </View>

                    <Text style={styles.historyHeading}>Bet History</Text>

                    {!isLoading && <FlatList
                        data={filteredTips}
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
                        scrollEnabled={false}
                        removeClippedSubviews={true}
                        contentContainerStyle={{ gap: 20 }}
                        ListFooterComponent={<View style={{ marginBottom: 100 }} />}
                    />}
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    headerHead: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
        color: "black",
        fontSize: 25,
        fontWeight: 700,
    },
    backBtn: {
        backgroundColor: "black",
        width: 40,
        height: 40,
        margin: 10,
        marginLeft: "5%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "white",
        marginBottom: 30,
        alignSelf: "center",
    },
    profileInfo: {
        alignItems: "center",
        marginBlock: 20,
        marginTop: 60
    },
    usernameCan: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    username: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    perimumBadge: {
        width: 30,
        height: 30,
        resizeMode: "contain",
    },
    statsCan: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    stat: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    statText: {
        color: "white",
    },
    bioCan: {
        backgroundColor: "#2B2B2B",
        padding: 20,
        borderRadius: 10,
        marginBlock: 20,
        marginTop: 40,
        color: "white"
    },
    headingBio: {
        fontSize: 20,
        color: "white"
    },
    bio: {
        fontSize: 16,
        textAlign: "justify",
        marginTop: 10
    },
    FollowBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: "#FFFF00",
        padding: 10,
        borderRadius: 10,
    },
    followBtnText: {
        color: "black",
        fontSize: 16,
    },
    historyHeading: {
        fontSize: 20,
        color: "white",
        marginBottom: 20,
        marginTop: 40,
    },
});