import { Role } from '../../../../../prisma/prisma-client/enums';

export const rolesName = {
  ADMIN: Role.ADMIN,
  USER: Role.USER,
};

export type RoleNamesTypes = (typeof rolesName)[keyof typeof rolesName];
