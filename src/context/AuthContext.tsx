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
  userName: string | null;
  userEmail: string | null;
  login: (token: string, role: Role, name: string, email: string) => void; // ✅ Aqui ajustado!
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<Role>('viewer');
  const [userName, setUserName] = useState<string | null>(null); // ✅ Novo estado
  const [userEmail, setUserEmail] = useState<string | null>(null); // ✅ Novo estado
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole') as Role | null;
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    if (token && role && name && email) {
      setIsLoggedIn(true);
      setUserRole(role);
      setUserName(name);
      setUserEmail(email);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

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

  const login = (token: string, role: Role, name: string, email: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
    setUserEmail(email);
  };

  const logout = () => {
    logoutService();
    setIsLoggedIn(false);
    setUserRole('viewer');
    setUserName(null);
    setUserEmail(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userRole,
        userName,
        userEmail,
        login,
        logout,
        isLoading,
      }}
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
