import { mainApiRequest } from '../core/helpers';
import * as SecureStore from 'expo-secure-store';
import { ApiSuccessResponse } from '../core/types';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

interface RegisterRequest {
  email: string;
  password: string;
}

export const login = async (data: LoginRequest): Promise<ApiSuccessResponse<LoginResponse>> => {
  const response = await mainApiRequest<LoginResponse>({
    url: '/auth/login',
    method: 'POST',
    data,
  });

  const { accessToken, refreshToken } = response.data;

  console.log(response)
  await SecureStore.setItemAsync('accessToken', accessToken);
  await SecureStore.setItemAsync('refreshToken', refreshToken);

  return response;
};

export const logout = async (): Promise<ApiSuccessResponse<null>> => {
  const response = await mainApiRequest<null>({
    url: '/auth/logout',
    method: 'POST',
  });

  // Limpiar tokens del almacenamiento seguro
  await SecureStore.deleteItemAsync('accessToken');
  await SecureStore.deleteItemAsync('refreshToken');

  return response;
};

export const register = async (
  data: RegisterRequest
): Promise<ApiSuccessResponse<null>> => {
  const response = await mainApiRequest<null>({
    url: '/auth/register',
    method: 'POST',
    data,
  });

  return response;
};
