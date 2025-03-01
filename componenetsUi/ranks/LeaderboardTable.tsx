import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardRow from './LeaderboardRow';

interface LeaderboardItem {
  rank: number;
  name: string;
  image: string;
  winRate: string;
  points: number;
  price: string;
}

interface LeaderboardTableProps {
  data: LeaderboardItem[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <LeaderboardHeader />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <LeaderboardRow
            item={item}
            isSelected={selectedRow === item.rank}
            onSelect={() => setSelectedRow(item.rank)}
          />
        )}
        keyExtractor={(item,index) => index.toString()}
        contentContainerStyle={{gap:20}}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        removeClippedSubviews={false}
        ListFooterComponent={<View style={{marginBottom:100}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default LeaderboardTable;
