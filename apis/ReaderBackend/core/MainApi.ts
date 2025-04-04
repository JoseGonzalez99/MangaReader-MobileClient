import axios, { AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store'; // o AsyncStorage si no usas Expo
import { ApiErrorResponse } from './types';

const mainApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

mainApi.interceptors.request.use(async (config) => {
  const accessToken = await SecureStore.getItemAsync('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

mainApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post('https://tudominio.com/api/v1/auth/refresh', {
            refreshToken,
          });

          const newAccessToken = refreshResponse.data.data.accessToken;
          await SecureStore.setItemAsync('accessToken', newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return mainApi(originalRequest);
        } catch (refreshErr) {
          return Promise.reject(refreshErr);
        }
      }
    }

    return Promise.reject(error);
  }
);


export default mainApi;
