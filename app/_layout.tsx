// app/_layout.tsx
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuthContext } from '@/contexts/AuthContext';
import '@/global.css'
export default function RootLayout() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

function AppNavigator() {
  const { isAuthenticated, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace('/home'); // o cualquier ruta inicial protegida
      } else {
        router.replace('/login');
      }
    }
  }, [loading, isAuthenticated]);

  if (loading) return null;

  return <Slot />;
}
