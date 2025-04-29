'use client';

import { Role } from '@/lib/auth';
import { useRegister } from './useRegister';
import Link from 'next/link';

export function RegisterForm() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    handleSubmit,
    loading,
  } = useRegister();

  return (
    <div className="flex min-h-screen w-full items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Registrar Usuário
        </h1>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Usuário:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Digite o nome de usuário"
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Senha:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Digite a senha"
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Cargo:
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="viewer">Visualizador</option>
            <option value="editor">Editor</option>
            <option value="admin">Administrador</option>
            <option value="seller">Vendedor</option>
            <option value="superAdmin">Super Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>

        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-blue-500 hover:underline">
            Voltar para a página inicial.
          </Link>
        </div>
      </form>
    </div>
  );
}
