Quiero que me ayudes a definir una estructura adecuada de expo-router de tal forma que cumplamos con las siguientes caracteristicas
1 - Se tener rutas protegidas y otras que no
2 - En caso de que el usuario no este autenticado no podra acceder a las rutas protegidas y si lo intenta lo redirigiremos directamente a la pagina de login.
3 - Se debe definir correctamente la ruta a la que la aplicacion va a renderizar por al momento de abrir la aplicacion, si es la primera ves que la aplicacion se abre obviamente no va a estar autenticado por lo que se debera redirigir a la pagina de login.
4 - Actualmetne tengo esta jerarquia de rutas, solo te lo comparto para que tengas de referencia como tengo organizado, actualmente esta arquitectura no esta funcionando adecuadamente ya que no machea las rutas.

  ./app
    ├── (app)
    │   ├── _layout.tsx --> AppProtectedLayout.tsx 
    │   ├── (main)
    │   │   ├── home
    │   │   │   └── index.tsx
    │   │   ├── _layout.tsx -->MainTabsLayout.tsx
    │   │   ├── library
    │   │   │   └── index.tsx
    │   │   └── profile
    │   │       └── index.tsx
    │   ├── (manga)
    │   │   ├── _layout.tsx-->MangaLayout.tsx
    │   │   ├── [mangaId]
    │   │   │   └── index.tsx
    │   │   └── volume
    │   │       └── [volumeId].tsx
    │   └── reader
    │       └── [chapterId].tsx
    ├── (auth)
    │   ├── _layout.tsx -->AuthLayout.tsx
    │   ├── login
    │   │   └── index.tsx
    │   └── register
    │       └── index.tsx
    └── _layout.tsx  --> RootLayout.tsx 

5 - Actualmente tengo un AuthContext que utilizariamos para gestionar el estado de autenticacion.

Codigo de AuthContext y su hook useAuth
// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../hooks/useAuth';

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

  const checkToken = async () => {
    const token = await SecureStore.getItemAsync('accessToken');
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkToken();
  }, []);

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

// hooks/useAuth.ts
import { useState } from 'react';
import { login as loginApi, logout as logoutApi, register as registerApi } from '@/apis/ReaderBackend/modules/Auth';
import { ApiException } from '@/apis/ReaderBackend/core/types';


export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiException | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await loginApi({ email, password });
    } catch (err) {
      if (err instanceof ApiException) setError(err);
      else console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutApi();
    } catch (err) {
      if (err instanceof ApiException) setError(err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await registerApi({ email, password });
    } catch (err) {
      if (err instanceof ApiException) setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    logout,
    register,
    loading,
    error,
  };
};

