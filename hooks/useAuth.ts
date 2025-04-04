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
