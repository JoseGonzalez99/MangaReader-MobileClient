// app/(app)/_layout.tsx
import { Redirect, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';

export default function ProtectedLayout() {
  const { isAuthenticated, loading } = useAuthContext();


  if (loading) return null;


    // ✅ Redirección segura
    if (!isAuthenticated) return <Redirect href="/(auth)/login" />;
  

  return <Stack
  
  screenOptions={{
    headerShown: false
  }}/>;
}
