import type { ApiResponse, Hardware, User } from "../utils/types";

const API_URL = 'http://127.0.0.1:8000/api';

// --- Fetch Helper ---
async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    credentials: 'include',
    ...options,
  });

  if (!response.ok) {
    const errorInfo = await response.json();
    throw new Error(errorInfo.message || 'An unknown error occurred');
  }

  return response.json();
}

// --- Funciones API para equipos ---
export const hardwareApi = {
  // Obtiene todos los equipos
  getAll: (): Promise<ApiResponse<Hardware[]>> => {
    return fetcher<Hardware[]>('hardware');
  },

  // Obtiene equipo por id
  getById: (id: number): Promise<ApiResponse<Hardware>> => {
    return fetcher<Hardware>(`hardware/${id}`);
  },

  // Crea nuevo equipo
  create: (data: Omit<Hardware, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Hardware>> => {
    return fetcher<Hardware>('hardware', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Actualiza equipo
  update: (id: number, data: Partial<Omit<Hardware, 'id' | 'created_at' | 'updated_at'>>): Promise<ApiResponse<Hardware>> => {
    return fetcher<Hardware>(`hardware/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Elimina equipo
  delete: (id: number): Promise<ApiResponse<{ message: string }>> => {
    return fetcher<{ message: string }>(`hardware/${id}`, {
      method: 'DELETE',
    });
  },

  // Busca equipo
  search: (query: string): Promise<ApiResponse<Hardware[]>> => {
    return fetcher<Hardware[]>(`hardware/search?query=${encodeURIComponent(query)}`);
  },
};

// --- Funcions API para usuarios ---
export const userApi = {
  // Obtiene todos los usuarios
  getAll: (): Promise<ApiResponse<User[]>> => {
    return fetcher<User[]>('users');
  },

  // Obtiene usuario por id
  getById: (id: number): Promise<ApiResponse<User>> => {
    return fetcher<User>(`users/${id}`);
  },

  // Crea nuevo usuario
  create: (data: Omit<User, 'id' | 'created_at' | 'updated_at' | 'email_verified_at' | 'remember_token'>): Promise<ApiResponse<User>> => {
    return fetcher<User>('users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Actualiza usuario
  update: (id: number, data: Partial<Omit<User, 'id' | 'created_at' | 'updated_at' | 'email_verified_at' | 'remember_token'>>): Promise<ApiResponse<User>> => {
    return fetcher<User>(`users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Elimina usuario
  delete: (id: number): Promise<ApiResponse<{ message: string }>> => {
    return fetcher<{ message: string }>(`users/${id}`, {
      method: 'DELETE',
    });
  },

  // Actualiza perfil del usuario activo
  updateProfile: (data: Partial<Omit<User, 'id' | 'created_at' | 'updated_at' | 'email_verified_at' | 'remember_token' | 'role'>>): Promise<ApiResponse<User>> => {
    return fetcher<User>('user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};