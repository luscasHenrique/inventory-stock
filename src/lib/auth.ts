import { LoginResponse, UserRole } from '@/types/models/User';
import { LoginRequest } from '@/types/api';

export type Role = UserRole; // reaproveita o tipo definido na model

export async function fakeLoginRequest(
  request: LoginRequest,
): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { email, password } = request;

  if (email === 'admin@example.com' && password === '123456') {
    return {
      token: 'fake-jwt-token-123456',
      user: {
        id: 1,
        name: 'Administrador',
        email: 'admin@example.com',
        role: 'admin',
      },
    };
  } else if (email === 'editor@example.com' && password === '123456') {
    return {
      token: 'fake-jwt-token-654321',
      user: {
        id: 2,
        name: 'Editor',
        email: 'editor@example.com',
        role: 'editor',
      },
    };
  } else {
    throw new Error('E-mail ou senha inválidos.');
  }
}

export async function fetchUserInfo(): Promise<LoginResponse['user']> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const email = localStorage.getItem('userEmail');

  if (email === 'admin@example.com') {
    return {
      id: 1,
      name: 'Administrador',
      email: 'admin@example.com',
      role: 'admin',
    };
  } else if (email === 'editor@example.com') {
    return {
      id: 2,
      name: 'Editor',
      email: 'editor@example.com',
      role: 'editor',
    };
  } else {
    throw new Error('Usuário não encontrado.');
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
}
