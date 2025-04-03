export interface ApiSuccessResponse<T = any> {
    timestamp: string;
    status: number;
    message: string;
    path: string;
    data: T;
  }
  
  export interface ApiErrorResponse {
    code: string;
    message: string;
    status: number;
    error: string;
    path: string;
    timestamp: string;
  }
  

  // Excepción personalizada para capturar errores lanzados desde mainApiRequest
export class ApiException extends Error implements ApiErrorResponse {
  code: string;
  status: number;
  error: string;
  path: string;
  timestamp: string;

  constructor(error: ApiErrorResponse) {
    super(error.message);
    this.name = 'ApiException';
    this.code = error.code;
    this.status = error.status;
    this.error = error.error;
    this.path = error.path;
    this.timestamp = error.timestamp;
  }
}