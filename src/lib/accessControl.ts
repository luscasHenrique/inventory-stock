// src/lib/accessControl.ts

import { UserRole } from '@/types/models/User';

interface AccessControlConfig {
  [path: string]: UserRole[];
}

export const accessControl: AccessControlConfig = {
  '/dashboard': [UserRole.Admin],
  '/settings': [UserRole.Admin],
  '/income/earnings': [UserRole.Admin],
};

export function hasAccess(pathname: string, userRole: UserRole): boolean {
  const allowedRoles = accessControl[pathname];
  if (!allowedRoles) return true;
  return allowedRoles.includes(userRole);
}
