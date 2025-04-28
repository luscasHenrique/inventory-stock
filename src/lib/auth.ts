// src/lib/auth.ts

export interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export async function fakeLoginRequest(
  email: string,
  password: string,
): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email === 'admin@example.com' && password === '123456') {
    return {
      token: 'fake-jwt-token-123456',
      user: { name: 'Administrador', email: 'admin@example.com' },
    };
  } else {
    throw new Error('E-mail ou senha inválidos.');
  }
}

export function logout() {
  localStorage.removeItem('token');
}

export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem('token'));
}
