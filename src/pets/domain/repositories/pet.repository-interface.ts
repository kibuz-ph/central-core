import { Prisma } from '../../../prisma/prisma-client/client';
import { Pet } from '../entities/pet.entity';

export interface PetRepositoryInterface {
  findUnique({ conditions }: { conditions: any }): Promise<Pet | null>;
  findMany({
    conditions,
    include,
    page,
    perPage,
  }: {
    conditions: any;
    include?: Prisma.PetInclude;
    page?: number;
    perPage?: number;
  }): Promise<Pet[]>;
  count(conditions: any): Promise<number>;
  createMany(pets: Pet[], tx?: Prisma.TransactionClient): Promise<Pet[]>;
  update(id: string, pet: Partial<Pet>, tx?: Prisma.TransactionClient): Promise<Pet>;
  delete(id: string, apartmentId: string, tx?: Prisma.TransactionClient): Promise<boolean>;
}
