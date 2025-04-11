// app/(app)/_layout.tsx
import { Redirect, Stack } from 'expo-router';
import { useAuthContext } from '@/contexts/AuthContext';

export default function ProtectedLayout() {
  const { isAuthenticated, loading } = useAuthContext();


  if (loading) return null;


    // ✅ Redirección segura
    if (isAuthenticated==false) return <Redirect href="/(auth)/login" />;
  

  return <Stack
  
  screenOptions={{
    headerShown: false
  }}/>;
}
