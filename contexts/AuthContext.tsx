// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'expo-router';
import { isTokenValid } from '@/helpers/validateJwt';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { login, logout, register, loading, error } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const checkToken = async () => {
    const token = await SecureStore.getItemAsync('accessToken');
  
    if (token) {
      const valid = isTokenValid(token);
      console.log('🧾 Token valid:', valid);
      if (valid) {
        setIsAuthenticated(true);
      } else {
        console.log('⛔️ Token expirado. Limpiando...');
        await SecureStore.deleteItemAsync('accessToken');
        setIsAuthenticated(false);
      }
    } else {
      console.log('🔍 No hay token en SecureStore');
      setIsAuthenticated(false);
    }
  };
  

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const printToken= async () =>{
      const token = await SecureStore.getItemAsync('accessToken');

      console.log('[AuthLayout] token:', token);
    }
  console.log('[AuthLayout] isAuthenticated:', isAuthenticated);
  printToken()
  if (!loading && isAuthenticated) {
    router.replace('/home');
  }
}, [isAuthenticated, loading]);


  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    await checkToken();
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  const handleRegister = async (email: string, password: string) => {
    await register(email, password);
    await checkToken();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
