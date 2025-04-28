'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { logout as logoutService } from '@/lib/auth';
import { Role } from '@/lib/auth';
import { usePathname, useRouter } from 'next/navigation';
import { hasAccess } from '@/lib/accessControl';
import { toast } from 'react-hot-toast';

interface AuthContextProps {
  isLoggedIn: boolean;
  userRole: Role;
  login: (token: string, role: Role) => void;
  logout: () => void;
  isLoading: boolean; // 🚩 Aqui!
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<Role>('viewer');
  const [isLoading, setIsLoading] = useState(true); // 🚩 Inicialmente true
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole') as Role | null;

    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
    setIsLoading(false); // 🔥 Só libera após checar token e role
  }, []);

  useEffect(() => {
    if (isLoading) return; // 🔒 Enquanto carrega, não verifica

    if (!isLoggedIn) {
      if (pathname !== '/login') {
        router.replace('/login');
      }
    } else {
      const allowed = hasAccess(pathname, userRole);
      if (!allowed) {
        if (pathname !== '/') {
          toast.error('Acesso Negado');
          router.replace('/');
        }
      }
    }
  }, [isLoggedIn, userRole, pathname, router, isLoading]);

  const login = (token: string, role: Role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const logout = () => {
    logoutService();
    setIsLoggedIn(false);
    setUserRole('viewer');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userRole, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
