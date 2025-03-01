import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

interface DateOfBirthInputProps {
  day: string;
  month: string;
  year: string;
  onChange: (field: string, value: string) => void;
  onBlur: (field: string) => void;
  errors: { day?: string; month?: string; year?: string };
  touched: { day?: boolean; month?: boolean; year?: boolean };
}

const DateOfBirthInput: React.FC<DateOfBirthInputProps> = ({
  day,
  month,
  year,
  onChange,
  onBlur,
  errors,
  touched,
}) => {
  // console.log(errors);
  return (
    <View>
      {/* DOB Fields */}
      <View style={styles.dobContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.dobInput, touched.day && errors.day ? styles.errorBorder : null]}
            placeholder="DD"
            placeholderTextColor="#888"
            keyboardType="numeric"
            maxLength={2}
            value={day}
            onChangeText={(value) => onChange("day", value)}
            onBlur={() => onBlur("day")}
          />
          {touched.day || errors.day && <Text style={styles.errorText}>{errors.day}</Text>}
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.dobInput, touched.month && errors.month ? styles.errorBorder : null]}
            placeholder="MM"
            placeholderTextColor="#888"
            keyboardType="numeric"
            maxLength={2}
            value={month}
            onChangeText={(value) => onChange("month", value)}
            onBlur={() => onBlur("month")}
          />
          {touched.month || errors.month && <Text style={styles.errorText}>{errors.month}</Text>}
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.dobInput, touched.year && errors.year ? styles.errorBorder : null]}
            placeholder="YYYY"
            placeholderTextColor="#888"
            keyboardType="numeric"
            maxLength={4}
            value={year}
            onChangeText={(value) => onChange("year", value)}
            onBlur={() => onBlur("year")}
          />
          {touched.year || errors.year && <Text style={styles.errorText}>{errors.year}</Text>}
        </View>
      </View>
    </View>
  );
};

// 🔹 Styles (No Changes Except for `inputWrapper`)
const styles = StyleSheet.create({
  dobContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputWrapper: {
    flex: 1,
    alignItems: "center",
  },
  dobInput: {
    width: "90%",
    backgroundColor: "#222",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "#FF4444",
    fontSize: 12,
    marginTop: 2,
  },
  errorBorder: {
    borderColor: "#FF4444",
    borderWidth: 1,
  },
});

export default DateOfBirthInput;
