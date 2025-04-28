// src/types/models/user.ts

import { Role } from '@/lib/auth';

/**
 * Dados de usuário.
 */
export interface User {
  name: string;
  email: string;
  role: Role;
}

/**
 * Resposta de login, contendo o token e os dados do usuário.
 */
export interface LoginResponse {
  token: string;
  user: User;
}
