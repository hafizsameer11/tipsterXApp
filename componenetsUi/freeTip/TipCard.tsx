import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FolderView from './FolderView';
import TipCardBox from './TipCardBox';
import TipCardBar from './TipCardBar';
import TipCardBtn from './TipCardBtn';

interface TipCardProps {
  winRate: string;
  profile: {
    image: string;
    name: string;
  };
  tipStatus: string;
  date: string;
  time: string;
  odds: string;
  wallet: {
    image?: string;
    name: string;
  };
  code: string;
}

const TipCard: React.FC<TipCardProps> = ({ winRate, profile, tipStatus, date, time, odds, wallet, code }) => {
  const whiteList = [
    { text: "W" },
    { text: "W" },
    { text: "W" },
    { text: "L", isRed: true },
    { text: "W" }
  ];

  return (
    <FolderView>
      <View style={{ padding: 20, paddingHorizontal: 10, position: 'relative' }}>

        <View style={styles.winrate}>
          <Text style={styles.heading}>Win Rate:</Text>
          <Text style={styles.subheading}>{winRate}</Text>
        </View>

        {/* header can */}
        <View style={styles.cardHeader}>
          <Image source={{ uri: profile.image }} style={styles.cardHeaderImage} />
          <View>
            <Text style={[styles.color, styles.headingOne]}>{profile.name}</Text>
            <View style={styles.cardHeaderInfo}>
              <Text style={[styles.color, styles.heading_2]}>Last 5:</Text>
              <View style={styles.whiteball}>
                {whiteList.map((item, index) => (
                  <TipCardBox text={item.text} isRed={item.isRed} key={index} />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* mid bar */}
        <TipCardBar
          status={tipStatus}
          date={date}
          time={time}
        />

        <TipCardBtn
          odds={odds}
          wallet={wallet}
          code={code}
        />

      </View>
    </FolderView>
  );
};

export default TipCard;

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 5
  },
  cardHeaderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: "#fff",
    borderWidth: 2
  },
  color: {
    color: "#fff",
  },
  cardHeaderInfo: {
    flexDirection: "row",
    gap: 10
  },
  headingOne: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },
  heading_2: {
    fontSize: 16,
    opacity: 0.50
  },
  whiteball: {
    flexDirection: "row",
    gap: 5
  },
  winrate: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
    borderRadius: 100,
    backgroundColor: "white",
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    gap: 5
  },
  heading: {
    fontSize: 14,
    opacity: 0.75
  },
  subheading: {
    fontSize: 18,
    fontWeight: '900'
  }
});