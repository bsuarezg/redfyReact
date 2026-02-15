import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
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
const StyledImage = styled(Image);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', { email, password });
      await login(response.data.token, response.data.user);
      router.replace('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center p-4">
      <StyledView className="w-full max-w-sm items-center">
        <StyledImage
          source={require('../assets/logo.png')}
          className="w-32 h-32 mb-6"
          resizeMode="contain"
        />
        <StyledText className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign In
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

        {error ? (
          <StyledText className="text-red-500 mb-4 text-center">{error}</StyledText>
        ) : null}

        <StyledTouchableOpacity
          className="bg-primary p-4 rounded-lg items-center w-full"
          onPress={handleLogin}
        >
          <StyledText className="text-white font-bold text-lg">Login</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </SafeAreaView>
  );
}
