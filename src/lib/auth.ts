import { LoginResponse, User } from '@/types/models/user';
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
        name: 'Editor',
        email: 'editor@example.com',
        role: 'editor',
      },
    };
  } else {
    throw new Error('E-mail ou senha inválidos.');
  }
}

/**
 * Simula a busca das informações atualizadas do usuário logado.
 */
export async function fetchUserInfo(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simula delay

  const email = localStorage.getItem('userEmail');

  if (email === 'admin@example.com') {
    return {
      name: 'Administrador', // Nome atualizado simulado
      email: 'admin@example.com',
      role: 'admin',
    };
  } else if (email === 'editor@example.com') {
    return {
      name: 'Editor', // Nome atualizado simulado
      email: 'editor@example.com',
      role: 'editor',
    };
  } else {
    throw new Error('Usuário não encontrado.');
  }
}

/**
 * Função de logout que limpa todas as informações salvas no localStorage.
 */
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
}
