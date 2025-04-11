// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "expo-router";
import { isTokenValid } from "@/helpers/validateJwt";
import { AppUser } from "@/dtos/mangareader.dto";
import { useAppUser } from "@/hooks/useAppUser";
import { ApiException } from "@/apis/ReaderBackend/core/types";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
  appUser: AppUser | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiException | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { login, logout, register } = useAuth();
  const { getUserInfo } = useAppUser();
  const router = useRouter();

  const checkToken = async () => {
    const token = await SecureStore.getItemAsync("accessToken");
    if (token) {
      const valid = isTokenValid(token);
      console.log("🧾 Token valid:", valid);
      if (valid) {
        setIsAuthenticated(true);
        return;
      } else {
        console.log("⛔️ Token expirado. Limpiando...");
        await SecureStore.deleteItemAsync("accessToken");
      }
    } else {
      console.log("🔍 No hay token en SecureStore");
    }
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const printToken = async () => {
      const token = await SecureStore.getItemAsync("accessToken");
      console.log("[AuthLayout] token:", token);
    };
    console.log("[AuthLayout] isAuthenticated:", isAuthenticated);
    printToken();
    if (!loading && isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, loading]);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      const user = await getUserInfo();
      if (user) {
        setAppUser(user);
        setIsAuthenticated(true);
      }
    } catch (err) {
      if (err instanceof ApiException) setError(err);
      else console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await register(email, password);
      const user = await getUserInfo();
      if (user) {
        setAppUser(user);
        setIsAuthenticated(true);
      }
    } catch (err) {
      if (err instanceof ApiException) setError(err);
      else console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setAppUser(null);
    setIsAuthenticated(false);
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
        appUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
