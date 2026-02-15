import { View, Text, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center p-4">
      <StyledView className="w-full max-w-sm items-center">
        <StyledText className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Redfy Health
        </StyledText>

        {user ? (
          <>
            <StyledText className="text-lg text-gray-700 mb-8 text-center">
              Welcome back, {user.name || user.email}!
            </StyledText>

            <StyledTouchableOpacity
              className="bg-blue-600 w-full py-3 rounded-lg mb-4"
              onPress={() => router.push('/profile')}
            >
              <StyledText className="text-white text-center font-semibold text-lg">
                Go to Profile
              </StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              className="bg-gray-200 w-full py-3 rounded-lg"
              onPress={logout}
            >
              <StyledText className="text-gray-800 text-center font-semibold text-lg">
                Logout
              </StyledText>
            </StyledTouchableOpacity>
          </>
        ) : (
          <>
            <StyledText className="text-lg text-gray-600 mb-8 text-center">
              Your health services in one place.
            </StyledText>

            <Link href="/login" asChild>
              <StyledTouchableOpacity className="bg-blue-600 w-full py-3 rounded-lg mb-4">
                <StyledText className="text-white text-center font-semibold text-lg">
                  Login
                </StyledText>
              </StyledTouchableOpacity>
            </Link>

            <Link href="/register" asChild>
              <StyledTouchableOpacity className="bg-white border border-blue-600 w-full py-3 rounded-lg">
                <StyledText className="text-blue-600 text-center font-semibold text-lg">
                  Register
                </StyledText>
              </StyledTouchableOpacity>
            </Link>
          </>
        )}
      </StyledView>
    </SafeAreaView>
  );
}
