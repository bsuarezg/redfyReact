import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import api from '../services/api';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('individual'); // 'individual' or 'clinic'
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!consent) {
      setError('You must agree to terms');
      return;
    }

    try {
      const response = await api.post('/register', {
        email,
        password,
        account_type: accountType,
        consent: true
      });
      await login(response.data.token, response.data.user);
      router.replace('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <StyledView className="w-full max-w-sm self-center">
          <StyledText className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create Account
          </StyledText>

          <StyledTextInput
            className="border border-gray-300 p-3 rounded-lg mb-4 text-base"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <StyledTextInput
            className="border border-gray-300 p-3 rounded-lg mb-4 text-base"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <StyledTextInput
            className="border border-gray-300 p-3 rounded-lg mb-4 text-base"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <StyledView className="mb-4">
            <StyledText className="text-sm font-bold text-gray-700 mb-2">Account Type</StyledText>
            <StyledView className="flex-row space-x-4">
              <StyledTouchableOpacity
                className={`flex-1 p-3 rounded-lg border ${accountType === 'individual' ? 'bg-blue-50 border-blue-600' : 'border-gray-300'}`}
                onPress={() => setAccountType('individual')}
              >
                <StyledText className={`text-center ${accountType === 'individual' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
                  Individual
                </StyledText>
              </StyledTouchableOpacity>

              <StyledTouchableOpacity
                className={`flex-1 p-3 rounded-lg border ${accountType === 'clinic' ? 'bg-blue-50 border-blue-600' : 'border-gray-300'}`}
                onPress={() => setAccountType('clinic')}
              >
                <StyledText className={`text-center ${accountType === 'clinic' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
                  Clinic
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>

          <StyledTouchableOpacity
            className="flex-row items-center mb-6"
            onPress={() => setConsent(!consent)}
          >
            <StyledView className={`h-6 w-6 border rounded mr-2 ${consent ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`} />
            <StyledText className="text-gray-700 text-sm flex-1">
              I agree to the Terms and Conditions
            </StyledText>
          </StyledTouchableOpacity>

          {error ? (
            <StyledText className="text-red-500 mb-4 text-center">{error}</StyledText>
          ) : null}

          <StyledTouchableOpacity
            className="bg-blue-600 p-4 rounded-lg items-center"
            onPress={handleRegister}
          >
            <StyledText className="text-white font-bold text-lg">Register</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </ScrollView>
    </SafeAreaView>
  );
}
