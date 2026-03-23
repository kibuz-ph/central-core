import { UserRoleType } from '../../../prisma/prisma-client/client';

export const userRoleTypes = {
  MASTER: UserRoleType.MASTER,
  ADMIN: UserRoleType.ADMIN,
  USER: UserRoleType.USER,
} as const;

export type UserRoleTypes = (typeof userRoleTypes)[keyof typeof userRoleTypes];
