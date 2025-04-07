import { Redirect, Stack } from 'expo-router';
import { useAuthContext } from '@/contexts/AuthContext';

export default function AppProtectedLayout() {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) return null;
  if (!isAuthenticated) return <Redirect href="/login" />;

  return <Stack />;
}
