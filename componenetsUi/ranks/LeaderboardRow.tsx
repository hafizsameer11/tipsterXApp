import { useAuth } from '@/contexts/authContext';
import { API_Images_Domain } from '@/utils/apiConfig';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface LeaderboardRowProps {
  item: {
    user_id: number;
    username: string;
    profile_picture: string;
    rank: number;
    points: number;
  }
  isSelected: boolean;
  onSelect: () => void;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ item, isSelected, onSelect }) => {
  console.log("row data : ",item);
  const {userData} = useAuth()
  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={[styles.row, isSelected && styles.selectedRow]}>
        <Text style={styles.rank}>{item.rank}</Text>
        <View style={styles.profile}>
          <Image source={{ uri: API_Images_Domain + (item.profile_picture || userData.profile_picture)  }} style={styles.profileImage} />
          <Text style={styles.name}>{item.username || userData.username }</Text>
        </View>
        {/* <Text style={styles.text}>{item.winRate}</Text> */}
        <Text style={styles.text}>{item.points}</Text>
        {/* <Text style={styles.text}>{item.price}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor:"#2B2B2B",
    borderRadius:10
  },
  selectedRow: {
    borderColor: '#008CFF',
    borderWidth: 2,
    borderRadius: 10,
  },
  rank: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profile: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  name: {
    color: 'white',
    fontSize: 14,
    textAlign:"center"
  },
  text: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
  },
});

export default LeaderboardRow;
