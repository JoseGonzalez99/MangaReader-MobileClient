import { Redirect, Stack } from 'expo-router';
import { useAuthContext } from '@/contexts/AuthContext';
import { colors } from '@/constants/colors';

export default function AppProtectedLayout() {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) return null;
  if (!isAuthenticated) return <Redirect href="/login" />;

  return <Stack screenOptions={{
    headerShown:false,
    statusBarHidden:true
  }}
      />;
}
