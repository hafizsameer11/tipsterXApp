import { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BottomSheet from '@gorhom/bottom-sheet';
import TabSelector from '@/componenetsUi/edit/TabSelector';
import InputField from '@/componenetsUi/edit/InputField';
import Button from '@/componenetsUi/edit/Button';
import ChangePassword from '@/componenetsUi/edit/ChangePassword';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function EditProfile() {
  const [activeTab, setActiveTab] = useState<'profile' | 'bank'>('profile');
  const [formData, setFormData] = useState({
    name: 'Alucard',
    phone: '07033484845',
    email: 'qamardeenoladimeji@gmail.com',
    dob: '14-12-1234',
    nationality: 'Nigerian',
    bankName: '',
    accountName: '',
    accountNumber: '',
  });

  // Reference for bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSave = () => {
    console.log('Saving profile data:', formData);
    Alert.alert(`${JSON.stringify(formData)}`)
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
            <InputField
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
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
  bankDetails: {
    flex: 1,
  },
});

