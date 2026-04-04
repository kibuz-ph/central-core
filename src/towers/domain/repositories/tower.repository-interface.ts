import { Prisma } from '../../../prisma/prisma-client/client';
import { Tower } from '../../../towers/domain/entities/tower.entity';

export interface TowerRepositoryInterface {
  findMany({ conditions }: { conditions: any }): Promise<Tower[]>;
  findUnique({ conditions, include }: { conditions: any; include?: any }): Promise<Tower | null>;
  createMany(towers: Tower[], tx?: Prisma.TransactionClient): Promise<Tower[]>;
  update(
    id: string,
    residentialComplexId: string,
    tower: Partial<Tower>,
    tx?: Prisma.TransactionClient,
  ): Promise<Tower>;
  delete(id: string, residentialComplexId: string, tx?: Prisma.TransactionClient): Promise<boolean>;
}
