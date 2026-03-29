import { Prisma } from '../../../prisma/prisma-client/client';
import { UsefulRoom } from '../entities/useful-room.entity';

export interface UsefulRoomRepositoryInterface {
  findUnique({ conditions }: { conditions: any }): Promise<UsefulRoom | null>;
  findMany({ conditions }: { conditions: any }): Promise<UsefulRoom[]>;
  createMany(usefulRooms: UsefulRoom[], tx?: Prisma.TransactionClient): Promise<UsefulRoom[]>;
  update(
    id: string,
    usefulRoom: Partial<UsefulRoom>,
    tx?: Prisma.TransactionClient,
  ): Promise<UsefulRoom>;
  delete(id: string, apartmentId: string, tx?: Prisma.TransactionClient): Promise<boolean>;
}
