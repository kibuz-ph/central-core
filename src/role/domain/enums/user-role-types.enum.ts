import { user_role_types } from '../../../prisma/prisma-client/client';

export const userRoleTypes = {
  ADMIN: user_role_types.ADMIN,
  USER: user_role_types.USER,
} as const;

export type UserRoleTypes = (typeof userRoleTypes)[keyof typeof userRoleTypes];
