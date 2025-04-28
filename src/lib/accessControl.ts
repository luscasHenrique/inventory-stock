// src/lib/accessControl.ts
import { Role } from './auth';

interface AccessControlConfig {
  [path: string]: Role[];
}

export const accessControl: AccessControlConfig = {
  '/dashboard': ['admin'],
  '/settings': ['admin'],
  '/income/earnings': ['admin'],
};

export function hasAccess(pathname: string, userRole: Role): boolean {
  const allowedRoles = accessControl[pathname];
  if (!allowedRoles) return true; // Se não tiver regra, todos têm acesso
  return allowedRoles.includes(userRole);
}
