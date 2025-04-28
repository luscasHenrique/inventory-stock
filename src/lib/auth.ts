// src/lib/auth.ts

export type Role = 'admin' | 'editor' | 'viewer';

export interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
    role: Role;
  };
}

/**
 * Simula uma requisição de login.
 */
export async function fakeLoginRequest(
  email: string,
  password: string,
): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula delay

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

/**
 * Realiza o logout, limpando token e role do localStorage.
 */
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
}
