import { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import BottomSheet from '@gorhom/bottom-sheet';
import TabSelector from '@/componenetsUi/edit/TabSelector';
import InputField from '@/componenetsUi/edit/InputField';
import Button from '@/componenetsUi/edit/Button';
import ChangePassword from '@/componenetsUi/edit/ChangePassword';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth } from '@/contexts/authContext';
import { API_Images_Domain } from '@/utils/apiConfig';
import { useMutation } from '@tanstack/react-query';
import { editProfile } from '@/utils/mutations/authMutations';
import { ApiError } from '@/utils/customApiCall';
import { showTopToast } from '@/utils/helpers';

export default function EditProfile() {
  const { token, userData } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'bank'>('profile');
  const [profilePicture, setProfilePicture] = useState(userData?.profile_picture ? `${API_Images_Domain}${userData.profile_picture}` : null);
  const [formData, setFormData] = useState({
    username: userData?.username,
    phone: userData?.phone,
    email: userData?.email,
    dob: userData?.dob,
    nationality: userData?.nationality,
  });

  // Reference for bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Handle profile picture selection
  const pickProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };
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

    // If a new profile picture was selected, add it to form data
    if (profilePicture && profilePicture !== `${API_Images_Domain}${userData.profile_picture}`) {
      const fileName = profilePicture.split('/').pop();
      const fileType = fileName?.split('.').pop();

      formDataToSend.append('profile_picture', {
        uri: profilePicture,
        name: fileName,
        type: `image/${fileType}`,
      } as any);
    }

    handleEdit({ data: formDataToSend, user_id: userData.id, token });
  };

  // Function to open bottom sheet
  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="dark" />
      <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

      <ScrollView style={styles.content}>
        {activeTab === 'profile' ? (
          <>
            {/* Profile Picture Section */}
            <View style={styles.profilePicContainer}>
              <Pressable onPress={pickProfilePicture}>
                <Image
                  source={profilePicture && { uri: profilePicture }}
                  style={styles.profileImage}
                />
              </Pressable>
              <Button title="Change Profile Picture" onPress={pickProfilePicture} />
            </View>

            {/* Profile Details */}
            <InputField
              value={formData.username}
              onChangeText={(text) => setFormData(prev => ({ ...prev, username: text }))}
              placeholder="Full Name"
            />
            <InputField
              value={formData.phone}
              onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
              placeholder="Phone Number"
            />
            <InputField
              value={formData.email}
              onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
              placeholder="Email"
            />
            <InputField
              value={formData.dob}
              onChangeText={(text) => setFormData(prev => ({ ...prev, dob: text }))}
              placeholder="Date of Birth"
            />
            <InputField
              value={formData.nationality}
              onChangeText={(text) => setFormData(prev => ({ ...prev, nationality: text }))}
              placeholder="Nationality"
            />

            <Button title="Save" onPress={handleSave} />
            <Button title="Change Password" onPress={openBottomSheet} variant="link" />
          </>
        ) : (
          // Bank Details Section
          <View style={styles.bankDetails}>
            <InputField
              value={formData.bankName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, bankName: text }))}
              placeholder="Bank Name"
            />
            <InputField
              value={formData.accountName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, accountName: text }))}
              placeholder="Account Name"
            />
            <InputField
              value={formData.accountNumber}
              onChangeText={(text) => setFormData(prev => ({ ...prev, accountNumber: text }))}
              placeholder="Account Number"
            />

            <Button title="Save" onPress={handleSave} />
          </View>
        )}
      </ScrollView>

      {/* Bottom Sheet for Changing Password */}
      <BottomSheet ref={bottomSheetRef} snapPoints={['50%']} enablePanDownToClose={true}>
        <ChangePassword onClose={() => bottomSheetRef.current?.close()} />
      </BottomSheet>
    </GestureHandlerRootView>
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
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  bankDetails: {
    flex: 1,
  },
});
