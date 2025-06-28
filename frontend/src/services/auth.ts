import type { ApiResponse, User } from "../utils/types";

const API_URL = 'http://127.0.0.1:8000/api';

// --- Fetch Helper for Auth ---
async function authFetcher<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include',
    ...options,
  });

  if (!response.ok) {
    const errorInfo = await response.json();
    throw new Error(errorInfo.message || 'Authentication failed');
  }

  return response.json();
}

// --- Interfaces de Autenticacion ---
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
  access_token?: string;
  token_type?: string;
  message: string;
}

// --- Funciones API de autenticación ---
export const authApi = {
  // Iniciar sesión
  login: (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    return authFetcher<AuthResponse>('login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Cerrar Sesión
  logout: (): Promise<ApiResponse<{ message: string }>> => {
    return authFetcher<{ message: string }>('logout', {
      method: 'POST',
    });
  },

  // Obtiene al usuario autenticado
  getCurrentUser: (): Promise<ApiResponse<User>> => {
    return authFetcher<User>('user');
  },

  // Refresca token de autenticación
  refreshToken: (): Promise<ApiResponse<{ token: string }>> => {
    return authFetcher<{ token: string }>('refresh', {
      method: 'POST',
    });
  },

}; 