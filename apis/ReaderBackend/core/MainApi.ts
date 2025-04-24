import axios, { AxiosError } from 'axios';
import { ApiErrorResponse } from './types';
import {Storage}  from '@/utils/storage'
const mainApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

mainApi.interceptors.request.use(async (config) => {
  const accessToken = await Storage.getItem('accessToken');
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

      const refreshToken = await  Storage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`, {
            refreshToken,
          });

          const newAccessToken = refreshResponse.data.data.accessToken;
          await Storage.setItem('accessToken', newAccessToken);

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
