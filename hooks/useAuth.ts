// hooks/useAuth.ts
import { useState } from 'react';
import { login as loginApi, logout as logoutApi, register as registerApi } from '@/apis/ReaderBackend/modules/Auth';
import { ApiException } from '@/apis/ReaderBackend/core/types';


export const useAuth = () => {

  const login = async (email: string, password: string) => {
    try {
      await loginApi({ email, password });
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {

    try {
      await logoutApi();
    } catch (err) {
      throw err;
    }
  };

  const register = async (email: string, password: string) => {

    try {
      await registerApi({ email, password });
    } catch (err) {
      throw err;
    }
  };

  return {
    login,
    logout,
    register,
  };
};
