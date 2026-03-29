import { Prisma } from '../../../prisma/prisma-client/client';
import { ResidentialComplex } from '../entities/residential-complex.entity';

export interface ResidentialComplexInterface {
  findUnique({
    conditions,
    include,
  }: {
    conditions: any;
    include?: any;
  }): Promise<ResidentialComplex | null>;
  findManyByUserId(userId: string): Promise<ResidentialComplex[]>;
  create(
    residentialComplex: ResidentialComplex,
    tx?: Prisma.TransactionClient,
  ): Promise<ResidentialComplex>;
  update(
    id: string,
    residentialComplex: Partial<ResidentialComplex>,
    tx?: Prisma.TransactionClient,
  ): Promise<ResidentialComplex>;
  delete(id: string, tx?: Prisma.TransactionClient): Promise<boolean>;
}
