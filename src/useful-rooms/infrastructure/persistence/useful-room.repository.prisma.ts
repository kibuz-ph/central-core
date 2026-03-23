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

    return UsefulRoom.fromPrisma({
      ...usefulRoom,
      description: usefulRoom.description ?? undefined,
    });
  }

  async findMany({
    conditions,
  }: {
    conditions: Prisma.UsefulRoomWhereInput;
  }): Promise<UsefulRoom[]> {
    const usefulRooms = await this.prisma.usefulRoom.findMany({
      where: conditions,
    });

    return usefulRooms.map(usefulRoom =>
      UsefulRoom.fromPrisma({ ...usefulRoom, description: usefulRoom.description ?? undefined }),
    );
  }

  async create(usefulRoom: UsefulRoomProps): Promise<UsefulRoom> {
    const created = await this.prisma.usefulRoom.create({
      data: usefulRoom,
    });

    return UsefulRoom.fromPrisma({ ...created, description: created.description ?? undefined });
  }

  async createMany(usefulRooms: UsefulRoomProps[]): Promise<UsefulRoom[]> {
    const created = await this.prisma.usefulRoom.createManyAndReturn({
      data: usefulRooms,
    });

    return created.map(usefulRoom =>
      UsefulRoom.fromPrisma({ ...usefulRoom, description: usefulRoom.description ?? undefined }),
    );
  }

  async update(id: string, usefulRoom: Partial<UsefulRoom>): Promise<UsefulRoom> {
    const updated = await this.prisma.usefulRoom.update({
      where: { id },
      data: usefulRoom,
    });

    return UsefulRoom.fromPrisma({ ...updated, description: updated.description ?? undefined });
  }

  async delete(id: string, apartmentId: string): Promise<boolean> {
    await this.prisma.usefulRoom.update({
      where: { id, apartmentId },
      data: { deletedAt: new Date() },
    });

    return true;
  }
}
