import { UserApartmentType } from '../../../prisma/prisma-client/client';

export const userApartmentTypes = {
  OWNER: UserApartmentType.OWNER,
  TENANT: UserApartmentType.TENANT,
  RESIDENT: UserApartmentType.RESIDENT,
} as const;

export type UserApartmentTypes = (typeof userApartmentTypes)[keyof typeof userApartmentTypes];
