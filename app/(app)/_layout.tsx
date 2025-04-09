// app/(app)/_layout.tsx
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';

export default function ProtectedLayout() {
  const { isAuthenticated, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, loading]);

  if (loading) return null;

  return <Stack />;
}
