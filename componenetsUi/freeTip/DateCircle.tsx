import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
  date: string;
  day: string;
  isSelected: boolean;
  setSelected : (selected : string ) => void;
};

const DateCircle = ({ date, day, isSelected, setSelected }: Props) => {
  return (
    <Pressable onPress={()=>setSelected(date)}>
        <View style={[styles.dateCircle, isSelected && styles.selectedDateCircle]}>
          <Text style={[styles.dateHeading, isSelected && styles.selectedText]}>{day}</Text>
          <Text style={[styles.dateSubheading, isSelected && styles.selectedText]}>{date}</Text>
        </View>
    </Pressable>
  );
};

export default DateCircle;

const styles = StyleSheet.create({
  dateCircle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#4B4B4B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateCircle: {
    backgroundColor: '#FFFF00',
  },
  dateHeading: {
    fontSize: 12,
    marginBottom: 5,
    color: 'white',
    textTransform: 'capitalize',
  },
  dateSubheading: {
    color: 'white',
    fontSize: 8,
  },
  selectedText: {
    color: 'black',
  },
});