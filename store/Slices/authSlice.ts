import { StateCreator } from 'zustand';
import { ApiException } from '@/apis/ReaderBackend/core/types';
import { isTokenValid } from '@/helpers/validateJwt';
import { login, logout, register } from '@/apis/ReaderBackend/modules/Auth';
import { userInfoApi } from '@/apis/ReaderBackend/modules/User';

import { Storage } from '@/utils/storage';
export interface AuthSlice {
  isAuthenticated: boolean;
  loading: boolean;
  error: ApiException | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  checkToken: () => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set, get) => {


  return {
    isAuthenticated: false,
    loading: false,
    error: null,

    login: async (email, password) => {
      set({ loading: true, error: null });
      console.log("Login -1 ")
      try {
        const response = await login({ email, password });
        const { accessToken, refreshToken } = response.data;
        await Storage.setItem("accessToken", accessToken);
        await Storage.setItem("refreshToken", refreshToken);
        set({ isAuthenticated: true });
      } catch (err) {
        if (err instanceof ApiException) {
          console.error(err);
          set({ error: err });
        } else {
          console.error('Unexpected error during login:', err);
        }
      } finally {
        set({ loading: false });
      }
    },

    register: async (email, password) => {
      set({ loading: true, error: null });

      try {
        const response = await register({ email, password });
        //const { accessToken, refreshToken } = response.data;
//
//        await SecureStore.setItemAsync('accessToken', accessToken);
  //      await SecureStore.setItemAsync('refreshToken', refreshToken);

   //     set({ isAuthenticated: true });
      } catch (err) {
        if (err instanceof ApiException) {
          set({ error: err });
        } else {
          console.error('Unexpected error during register:', err);
        }
      } finally {
        set({ loading: false });
      }
    },

    logout: async () => {
      try {
        await logout();//logout de mi useAuth

      } catch (err) {
        console.warn('Logout error (continuando de todas formas):', err);
      }

      await Storage.deleteItem('accessToken');
      await Storage.deleteItem('refreshToken');

      set({ isAuthenticated: false });
    },

    checkToken: async () => {
      const token = await Storage.getItem('accessToken');
      const isValid = token && isTokenValid(token);

      set({ isAuthenticated: Boolean(isValid) });

      if (!isValid) {
        await Storage.deleteItem('accessToken');
        await Storage.deleteItem('refreshToken');
  
      }
    },
  };
};

