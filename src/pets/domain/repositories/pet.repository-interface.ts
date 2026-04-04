import { Prisma } from '../../../prisma/prisma-client/client';
import { Pet } from '../entities/pet.entity';

export interface PetRepositoryInterface {
  findUnique({ conditions }: { conditions: any }): Promise<Pet | null>;
  findMany({ conditions }: { conditions: any }): Promise<Pet[]>;
  createMany(pets: Pet[], tx?: Prisma.TransactionClient): Promise<Pet[]>;
  update(id: string, pet: Partial<Pet>, tx?: Prisma.TransactionClient): Promise<Pet>;
  delete(id: string, apartmentId: string, tx?: Prisma.TransactionClient): Promise<boolean>;
}
