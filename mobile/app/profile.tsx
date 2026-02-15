import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    surname: '',
    phone: '',
    dni: '',
    birthdate: '',
    address: '',
    city: '',
    zipcode: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        const p = response.data.profile || {};
        setProfile(p);
        setFormData({
          surname: p.surname || '',
          phone: p.phone || '',
          dni: p.dni || '',
          birthdate: p.birthdate || '',
          address: p.address || '',
          city: p.city || '',
          zipcode: p.zipcode || '',
        });
      } catch (err) {
        console.log('Error fetching profile', err);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await api.put('/profile', formData);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <StyledText className="text-2xl font-bold mb-6 text-gray-800">My Profile</StyledText>

        <StyledView className="mb-4">
          <StyledText className="text-sm font-bold text-gray-700 mb-1">Name</StyledText>
          <StyledTextInput
            className="border border-gray-300 p-3 rounded-lg bg-gray-100 text-gray-500"
            value={user?.name || ''}
            editable={false}
          />
        </StyledView>

        <StyledView className="mb-4">
          <StyledText className="text-sm font-bold text-gray-700 mb-1">Surname</StyledText>
          <StyledTextInput
            className="border border-gray-300 p-3 rounded-lg text-black"
            value={formData.surname}
            onChangeText={(text) => handleChange('surname', text)}
          />
        </StyledView>

        <StyledView className="mb-4">
          <StyledText className="text-sm font-bold text-gray-700 mb-1">Phone</StyledText>
          <StyledTextInput
            className="border border-gray-300 p-3 rounded-lg text-black"
            value={formData.phone}
            onChangeText={(text) => handleChange('phone', text)}
            keyboardType="phone-pad"
          />
        </StyledView>

        <StyledView className="mb-4">
          <StyledText className="text-sm font-bold text-gray-700 mb-1">City</StyledText>
          <StyledTextInput
            className="border border-gray-300 p-3 rounded-lg text-black"
            value={formData.city}
            onChangeText={(text) => handleChange('city', text)}
          />
        </StyledView>

        <StyledTouchableOpacity
          className="bg-blue-600 p-4 rounded-lg items-center mt-4"
          onPress={handleUpdate}
          disabled={loading}
        >
          <StyledText className="text-white font-bold text-lg">
            {loading ? 'Saving...' : 'Save Changes'}
          </StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          className="bg-red-500 p-4 rounded-lg items-center mt-4"
          onPress={logout}
        >
          <StyledText className="text-white font-bold text-lg">Logout</StyledText>
        </StyledTouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
