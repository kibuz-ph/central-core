import { Prisma } from '../../../prisma/prisma-client/client';
import { UsefulRoom } from '../entities/useful-room.entity';

export interface UsefulRoomRepositoryInterface {
  findUnique({ conditions }: { conditions: any }): Promise<UsefulRoom | null>;
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
  }): Promise<UsefulRoom[]>;
  count(conditions: any): Promise<number>;
  createMany(usefulRooms: UsefulRoom[], tx?: Prisma.TransactionClient): Promise<UsefulRoom[]>;
  update(
    id: string,
    usefulRoom: Partial<UsefulRoom>,
    tx?: Prisma.TransactionClient,
  ): Promise<UsefulRoom>;
  delete(id: string, apartmentId: string, tx?: Prisma.TransactionClient): Promise<boolean>;
}
