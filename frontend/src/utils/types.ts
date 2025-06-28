// Interfaces de API

export interface ApiResponse<T> {
  success: boolean;
  payload: T;
  status: number;
  message: string;
  url?: string;
  timestamp?: number;
}


export interface Hardware {
  id: number;
  motortype: 'gasolina' | 'diesel' | 'gas' | 'eléctrico';
  name: string;
  fabrication_date: string; 
  kW: number;
  RPM: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string; 
  password?: string; 
  role: 'user' | 'admin';
  active: boolean;
  remember_token?: string; 
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  login: (data: User, token?: string) => void;
  logout: () => void;
}