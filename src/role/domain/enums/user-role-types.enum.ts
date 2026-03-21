import { user_role_types } from '../../../prisma/prisma-client/client';

export const userRoleTypes = {
  SUPER_ADMIN: user_role_types.SUPER_ADMIN,
  ADMIN: user_role_types.ADMIN,
  USER: user_role_types.USER,
} as const;

export type UserRoleTypes = (typeof userRoleTypes)[keyof typeof userRoleTypes];
