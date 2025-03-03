import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LeaderboardHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Rank</Text>
      <Text style={styles.headerText}>Profile</Text>
      {/* <Text style={styles.headerText}>Win rate</Text> */}
      <Text style={styles.headerText}>Point</Text>
      {/* <Text style={styles.headerText}>Price</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LeaderboardHeader;
