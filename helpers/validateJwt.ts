// utils/auth/validateJwt.ts
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);

    const now = Math.floor(Date.now() / 1000); // segundos
    return decoded.exp > now;
  } catch (error) {
    console.warn('❌ Invalid token format');
    return false;
  }
};
