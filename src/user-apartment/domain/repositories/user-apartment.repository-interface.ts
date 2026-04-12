import { Prisma } from '../../../prisma/prisma-client/client';
import { UserApartment } from '../entities/user-apartment.entity';

export interface UserApartmentRepositoryInterface {
  findUnique({ conditions }: { conditions: unknown }): Promise<UserApartment | null>;
  findMany({ conditions }: { conditions: unknown }): Promise<UserApartment[]>;
  create(userApartment: UserApartment, tx?: Prisma.TransactionClient): Promise<UserApartment>;
  delete(id: string): Promise<void>;
}
