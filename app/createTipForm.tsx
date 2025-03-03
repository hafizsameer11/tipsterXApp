import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@/componenetsUi/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import Iframe from '@/componenetsUi/Iframe'
import { ThemedText } from '@/components/ThemedText'
import FAQs from '@/componenetsUi/subscription/Faqs'
import { Link, useRouter } from 'expo-router'
import TipCard from '@/componenetsUi/freeTip/TipCard'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/authContext'
import { getTipFaqs, TipHistory } from '@/utils/queries/Tip'

const CreateTipForm = () => {
  const route = useRouter();
  const { token , user} = useAuth();
  // const faqs = [
  //   { title: 'What is tipster ?', content: 'I Dont Know' },
  //   { title: 'How do i add games', content: 'You can add games by clicking on the add button on the home screen and and reading the rules and regulations' }
  // ];

  const { data: tipsFaqs, isLoading, error } = useQuery({
    queryKey: ['tipsFaqs'],
    queryFn: () => getTipFaqs(token),
  });
  const faqs = tipsFaqs?.data;
  console.log("faqs question",faqs);


  const { data: history, isLoading:loadingStatus , error : geterror } = useQuery({
    queryKey: ['tipsHistory'],
    queryFn: () => TipHistory(token),
  });
  // console.log("history",history?.data);
  const tipJson = history?.data;
  return (
    <SafeAreaView style={{ paddingHorizontal: 15, gap: 20 }}>
      <ScrollView 
        contentContainerStyle={{gap:20}}
      >
        <Header rNumber={10} profileImage={"https://randomuser.me/api/portraits/men/1.jpg"} notHeaderShown={true} />
  
        {/* video Container */}
        <View style={styles.videoContainer}>
          <Iframe videoId='<iframe width="100%" height="100%" src="https://www.youtube.com/embed/5D3ubGAACHg?si=UFq46Xs5e9GoFhC2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' />
          <Text style={styles.videoText}>
            Watch video to learn the rules and regulations of using
            tipster
          </Text>
        </View>
  
        {/* faqs container */}
        {faqs && <FAQs Faqs={faqs} heading={true} />}
  
        {/* create tip button */}
        <Pressable style={styles.createTipBtn} onPress={() => route.push('/createtip')}>
          <ThemedText style={styles.createTipBtnText}>
            Create Tip
          </ThemedText>
        </Pressable>

        <View style={styles.divider}></View>
  
        {/* tip histories */}
        <View style={styles.historyHeader}>
          <Text style={styles.historyH1}>Tips History</Text>
          <Link href={"/"} style={styles.historyViewAllBtn}>View All</Link>
        </View>
  
        {/* history tip flalist */}
        <FlatList
            data={tipJson}
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
  
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateTipForm

const styles = StyleSheet.create({
  videoContainer: {
    padding: 10,
    backgroundColor: '#2B2B2B',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    position: 'relative',
    gap: 20
  },
  videoText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24
  },
  createTipBtn: {
    backgroundColor: '#FFFF00',
    padding: 15,
    borderRadius: 10
  },
  createTipBtnText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  historyH1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  historyViewAllBtn: {
    color: '#FFFF00',
    fontSize: 16,
    fontWeight: 'bold'
  },
  divider:{
    width:100,
    height:2,
    backgroundColor:'white',
    marginVertical:10,
    margin:"auto"
  }
})