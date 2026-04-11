import { Prisma } from '../../../prisma/prisma-client/client';
import { Apartment } from '../../../apartments/domain/entities/apartment.entity';

export interface ApartmentRepositoryInterface {
  findUnique({
    conditions,
    include,
  }: {
    conditions: any;
    include?: any;
  }): Promise<Apartment | null>;
  findMany({
    conditions,
    include,
    page,
    perPage,
  }: {
    conditions: any;
    include?: any;
    page?: number;
    perPage?: number;
  }): Promise<Apartment[]>;
  count(conditions: any): Promise<number>;
  createMany(apartments: Apartment[], tx?: Prisma.TransactionClient): Promise<Apartment[]>;
  update(
    id: string,
    apartment: Partial<Apartment>,
    tx?: Prisma.TransactionClient,
  ): Promise<Apartment>;
  delete(id: string, residentialComplexId: string, tx?: Prisma.TransactionClient): Promise<boolean>;
}
