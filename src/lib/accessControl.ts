import { UserRole } from '@/types/models/User';

interface AccessControlConfig {
  [path: string]: UserRole[];
}

export const accessControl: AccessControlConfig = {
  '/dashboard': ['admin'],
  '/settings': ['admin'],
  '/income/earnings': ['admin'],
};

export function hasAccess(pathname: string, userRole: UserRole): boolean {
  const allowedRoles = accessControl[pathname];
  if (!allowedRoles) return true;
  return allowedRoles.includes(userRole);
}
