import axios, { AxiosError } from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Storage } from '@/utils/storage';
import { ApiErrorResponse } from './types';

type JwtPayload = {
  exp: number;
};

const mainApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

// INTERCEPTOR REQUEST
mainApi.interceptors.request.use(async (config) => {
  const accessToken = await Storage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// INTERCEPTOR RESPONSE
mainApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await Storage.getItem('refreshToken');

      // Verificamos si el refresh token sigue siendo válido
      if (refreshToken) {
        try {
          const { exp } = jwtDecode<JwtPayload>(refreshToken);
          const isExpired = Date.now() >= exp * 1000;

          if (isExpired) {
            await Storage.clear(); // Token vencido
            return Promise.reject(new Error('Refresh token expired'));
          }

          // Si no está vencido, intentamos refrescar el token
          const refreshResponse = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`, {
            refreshToken,
          });

          const newAccessToken = refreshResponse.data.data.accessToken;
          await Storage.setItem('accessToken', newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return mainApi(originalRequest);
        } catch (err) {
          await Storage.clear(); // Por si el refresh falla
          return Promise.reject(err);
        }
      } else {
        await Storage.clear(); // No hay refresh token
      }
    }

    return Promise.reject(error);
  }
);

export default mainApi;
