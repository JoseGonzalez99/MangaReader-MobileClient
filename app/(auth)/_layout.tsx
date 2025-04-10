// app/(auth)_layout.tsx
import { Stack, Redirect } from 'expo-router';
import { useAuthContext } from '@/contexts/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) return null;

  // ✅ Redirección segura
  if (isAuthenticated) return <Redirect href="/(main)/home" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
