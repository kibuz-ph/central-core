import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '../../../prisma/prisma-client/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { UsefulRoom, UsefulRoomProps } from '../../domain/entities/useful-room.entity';
import { UsefulRoomRepositoryInterface } from '../../domain/repositories/useful-room.repository-interface';

@Injectable()
export class UsefulRoomPrismaRepository implements UsefulRoomRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findUnique({
    conditions,
  }: {
    conditions: Prisma.UsefulRoomWhereInput;
  }): Promise<UsefulRoom | null> {
    const usefulRoom = await this.prisma.usefulRoom.findFirst({
      where: { ...conditions, deletedAt: null },
    });

    if (!usefulRoom) return null;

    return UsefulRoom.fromPrisma(usefulRoom);
  }

  async findMany({
    conditions,
  }: {
    conditions: Prisma.UsefulRoomWhereInput;
  }): Promise<UsefulRoom[]> {
    const usefulRooms = await this.prisma.usefulRoom.findMany({
      where: conditions,
    });

    return usefulRooms.map(usefulRoom => UsefulRoom.fromPrisma(usefulRoom));
  }

  async createMany(
    usefulRooms: UsefulRoomProps[],
    tx?: Prisma.TransactionClient,
  ): Promise<UsefulRoom[]> {
    const client = tx ?? this.prisma;
    const created = await client.usefulRoom.createManyAndReturn({
      data: usefulRooms,
    });

    return created.map(usefulRoom => UsefulRoom.fromPrisma(usefulRoom));
  }

  async update(
    id: string,
    usefulRoom: Partial<UsefulRoom>,
    tx?: Prisma.TransactionClient,
  ): Promise<UsefulRoom> {
    const client = tx ?? this.prisma;
    const updated = await client.usefulRoom.update({
      where: { id },
      data: usefulRoom,
    });

    return UsefulRoom.fromPrisma(updated);
  }

  async delete(id: string, apartmentId: string, tx?: Prisma.TransactionClient): Promise<boolean> {
    const client = tx ?? this.prisma;
    await client.usefulRoom.update({
      where: { id, apartmentId },
      data: { deletedAt: new Date() },
    });

    return true;
  }
}
