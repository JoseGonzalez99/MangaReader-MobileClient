// core/helpers.ts

import { AxiosRequestConfig, AxiosError } from 'axios';
import MainApi from './MainApi';
import { ApiSuccessResponse, ApiErrorResponse, ApiException } from './types';

export const mainApiRequest = async <T = any>(
  config: AxiosRequestConfig
): Promise<ApiSuccessResponse<T>> => {
  try {
    const response = await MainApi(config);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError;
      // Intenta obtener respuesta estructurada del backend
      const backendError = axiosError.response?.data as ApiErrorResponse | undefined;

      if (backendError && backendError.code && backendError.message) {
        throw new ApiException(backendError);
      }
      // Fallback solo si el backend no tiene estructura válida
      throw new ApiException({
        message: axiosError.message || 'Unexpected error',
        status: axiosError.response?.status || 500,
        code: 'UNSTRUCTURED_BACKEND_ERROR',
        error: axiosError.name,
        path: config.url || '',
        timestamp: new Date().toISOString(),
      });
    }

    // Si no es un AxiosError, lanza una excepción genérica
    throw new ApiException({
      message: 'Unexpected non-Axios error',
      status: 500,
      code: 'UNEXPECTED',
      error: error?.toString?.() ?? 'Unknown',
      path: config.url || '',
      timestamp: new Date().toISOString(),
    });
  }
};
