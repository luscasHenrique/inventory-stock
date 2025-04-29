export type UserRole = 'admin' | 'editor' | 'viewer' | 'seller' | 'superAdmin';

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  avatar_url?: string | null;
  role: UserRole;
  is_active: boolean;
  last_login: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: UserRole;
  };
}
