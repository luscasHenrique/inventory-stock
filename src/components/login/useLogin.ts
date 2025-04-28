// src/components/login/useLogin.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulação de login (substitua depois pela sua API real)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula delay da API

      if (email === 'admin@example.com' && password === '123456') {
        toast.success('Login realizado com sucesso!');
        // Exemplo de redirecionamento após login:
        router.push('/');
      } else {
        toast.error('E-mail ou senha inválidos.');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar logar.');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
  };
}
