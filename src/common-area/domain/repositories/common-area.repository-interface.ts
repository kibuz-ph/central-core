import { Prisma } from '../../../prisma/prisma-client/client';
import { CommonArea } from '../entities/common-area.entity';

export interface CommonAreaRepositoryInterface {
  findUnique({ conditions }: { conditions: any }): Promise<CommonArea | null>;
  findMany({ conditions }: { conditions: any }): Promise<CommonArea[]>;
  createMany(commonAreas: CommonArea[], tx?: Prisma.TransactionClient): Promise<CommonArea[]>;
  update(
    id: string,
    residentialComplexId: string,
    commonArea: Partial<CommonArea>,
    tx?: Prisma.TransactionClient,
  ): Promise<CommonArea>;
  delete(id: string, residentialComplexId: string, tx?: Prisma.TransactionClient): Promise<boolean>;
}
