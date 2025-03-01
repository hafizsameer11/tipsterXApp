import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export default function InputField({ value, onChangeText, placeholder, editable = true }: InputFieldProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666"
        style={styles.input}
        editable={editable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  input: {
    color: 'white',
    fontSize: 16,
    padding: 16,
  },
});