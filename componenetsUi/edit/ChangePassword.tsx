import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import InputField from '@/componenetsUi/edit/InputField';
import Button from '@/componenetsUi/edit/Button';
import { useMutation } from '@tanstack/react-query';
import { editProfile } from '@/utils/mutations/authMutations';
import { ApiError } from '@/utils/customApiCall';
import { showTopToast } from '@/utils/helpers';

export default function ChangePasswordSheet({ onClose } : any) {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { mutate: handleEdit, isPending: registerPending } = useMutation({
    mutationKey: ["editProfile"],
    mutationFn: ({ data, user_id, token }: { data: FormData, user_id: number, token: string }) => editProfile(data, user_id, token),
    onSuccess: async (data) => {
      const result = data?.data;
      Alert.alert('Profile Updated', 'Your profile has been successfully updated.');
    },
    onError: (error: ApiError) => {
      showTopToast({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    },
  });

  const handleSave = async () => {
    console.log('Saving profile data:', formData);

    // Prepare form data
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    handleEdit({ data: formDataToSend, user_id: userData.id, token });
  };

  const PasswordIcon = () => (
    <Ionicons name="eye-outline" size={24} color="#666" style={styles.eyeIcon} />
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <InputField
            value={formData.oldPassword}
            onChangeText={(text) => setFormData(prev => ({ ...prev, oldPassword: text }))}
            placeholder="Old Password"
            // icon={<PasswordIcon />}
          />
          <InputField
            value={formData.newPassword}
            onChangeText={(text) => setFormData(prev => ({ ...prev, newPassword: text }))}
            placeholder="New Password"
            // icon={<PasswordIcon />}
          />
          <InputField
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
            placeholder="New Password again"
            // icon={<PasswordIcon />}
          />
        </View>
        
        <Button title="Save" onPress={handleSave} />
        <Button title="Back to Profile" onPress={onClose} variant="link" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    marginTop: 16,
  },
  inputContainer: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
  },
});