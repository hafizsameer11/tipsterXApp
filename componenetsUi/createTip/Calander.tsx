import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format, addDays, isSameDay, startOfMonth, getDaysInMonth, isToday, addMonths, isBefore } from 'date-fns';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface CalendarProps {
  onDateSelect: (date: string) => void;
}

export default function Calendar({ onDateSelect }: CalendarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const minSelectableDate = addDays(new Date(), 2);

  const getDaysArray = useMemo(() => {
    const firstDay = startOfMonth(currentMonth);
    const daysInMonth = getDaysInMonth(currentMonth);
    const startingDayIndex = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayIndex; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }
    
    return days;
  }, [currentMonth]);

  const handleDateSelect = (date: Date) => {
    if (isBefore(date, minSelectableDate)) {
      return;
    }
    // ondate select paste 2 days before selected date
    const formattedDate = format(addDays(date, -2), 'dd-MM-yyyy');
    setSelectedDate(date);
    onDateSelect(formattedDate);
    setIsVisible(false);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    const newMonth = addMonths(currentMonth, -1);
    if (!isBefore(newMonth, new Date())) {
      setCurrentMonth(newMonth);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setIsVisible(true)}
      >
        <Text style={[styles.dateText, !selectedDate && styles.placeholder]}>
          {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select Date'}
        </Text>
        <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Select Date</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsVisible(false)}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.monthSelector}>
              <TouchableOpacity onPress={prevMonth}>
                <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.monthYearContainer}>
                <Text style={styles.monthYear}>
                  {MONTHS[currentMonth.getMonth()]}  {currentMonth.getFullYear()}
                </Text>
              </View>
              <TouchableOpacity onPress={nextMonth}>
                <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.weekDays}>
              {DAYS.map((day, index) => (
                <Text key={index} style={[styles.weekDay, index === 0 && styles.sunday]}>
                  {day}
                </Text>
              ))}
            </View>

            <ScrollView>
              <View style={styles.daysGrid}>
                {getDaysArray.map((date, index) => {
                  if (!date) {
                    return <View key={`empty-${index}`} style={styles.dayCell} />;
                  }

                  const isSelected = selectedDate && isSameDay(date, selectedDate);
                  const isDisabled = isBefore(date, minSelectableDate);
                  const isTodayDate = isToday(date);

                  return (
                    <TouchableOpacity
                      key={date.toISOString()}
                      style={[
                        styles.dayCell,
                        isSelected && styles.selectedDay,
                        isDisabled && styles.disabledDay,
                        isTodayDate && styles.today
                      ]}
                      onPress={() => !isDisabled && handleDateSelect(date)}
                      disabled={isDisabled}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          isSelected && styles.selectedDayText,
                          isDisabled && styles.disabledDayText,
                          date.getDay() === 0 && styles.sundayText
                        ]}
                      >
                        {date.getDate()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2B2B2B',
    borderRadius: 8,
    padding: 16,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  placeholder: {
    color: '#888888',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  calendarContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthYearContainer: {
    alignItems: 'center',
  },
  monthYear: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  weekDays: {
    flexDirection: 'row',
    // marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    justifyContent:"space-evenly"
  },
  sunday: {
    color: '#FFE600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: (SCREEN_WIDTH - 32) / 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: '#FFE600',
    borderRadius: 20,
  },
  selectedDayText: {
    color: '#000000',
    fontWeight: '600',
  },
  disabledDay: {
    opacity: 0.3,
  },
  disabledDayText: {
    color: '#888888',
  },
  today: {
    borderWidth: 1,
    borderColor: '#FFE600',
    borderRadius: 20,
  },
  sundayText: {
    color: '#FFE600',
  },
});