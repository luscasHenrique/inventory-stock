'use client';

import { useLogin } from './useLogin';

export function LoginForm() {
  const { email, setEmail, password, setPassword, loading, handleLogin } =
    useLogin();

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-2xl m-2 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm mb-1">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm mb-1">
            Senha
          </label>
          <input
            id="password"
            type="password"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
