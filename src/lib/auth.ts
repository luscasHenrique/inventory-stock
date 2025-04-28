// src/lib/auth.ts

import { LoginResponse } from '@/types/models/user';
import { LoginRequest } from '@/types/api';

export type Role = 'admin' | 'editor' | 'viewer';

/**
 * Simula uma requisição de login.
 */
export async function fakeLoginRequest(
  request: LoginRequest,
): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula delay

  const { email, password } = request;

  if (email === 'admin@example.com' && password === '123456') {
    return {
      token: 'fake-jwt-token-123456',
      user: {
        name: 'Administrador',
        email: 'admin@example.com',
        role: 'admin',
      },
    };
  } else if (email === 'editor@example.com' && password === '123456') {
    return {
      token: 'fake-jwt-token-654321',
      user: {
        name: 'Editor User',
        email: 'editor@example.com',
        role: 'editor',
      },
    };
  } else {
    throw new Error('E-mail ou senha inválidos.');
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName'); // Adicionado para limpar o nome do usuário
  localStorage.removeItem('userEmail'); // Adicionado para limpar o e-mail do usuário
}
