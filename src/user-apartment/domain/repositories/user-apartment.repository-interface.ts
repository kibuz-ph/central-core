import { Prisma } from '../../../prisma/prisma-client/client';
import { UserApartmentTypes } from '../../../category-user/domain/enums/user-apartment-type.enum';
import { UserApartment } from '../entities/user-apartment.entity';

export interface ResidentialComplexUsersFilters {
  email?: string;
  name?: string;
  apartmentReference?: string;
  apartmentFloor?: number;
  categoryName?: UserApartmentTypes;
}

export interface UserApartmentRepositoryInterface {
  findUnique({ conditions }: { conditions: unknown }): Promise<UserApartment | null>;
  findMany({ conditions }: { conditions: unknown }): Promise<UserApartment[]>;
  findManyByResidentialComplex(where: any, skip: number, take: number): Promise<UserApartment[]>;
  countUsersByResidentialComplex(where: any): Promise<number>;
  create(userApartment: UserApartment, tx?: Prisma.TransactionClient): Promise<UserApartment>;
  delete(id: string): Promise<void>;
}
