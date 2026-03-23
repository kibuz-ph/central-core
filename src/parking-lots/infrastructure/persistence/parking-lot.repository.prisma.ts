import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '../../../prisma/prisma-client/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ParkingLot, ParkingLotProps } from '../../domain/entities/parking-lot.entity';
import { ParkingLotRepositoryInterface } from '../../domain/repositories/parking-lot.repository-interface';

@Injectable()
export class ParkingLotPrismaRepository implements ParkingLotRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findUnique({
    conditions,
  }: {
    conditions: Prisma.ParkingLotWhereInput;
  }): Promise<ParkingLot | null> {
    const parkingLot = await this.prisma.parkingLot.findFirst({
      where: conditions,
    });

    if (!parkingLot) return null;

    return ParkingLot.fromPrisma({
      ...parkingLot,
      description: parkingLot.description ?? undefined,
    });
  }

  async findMany({
    conditions,
  }: {
    conditions: Prisma.ParkingLotWhereInput;
  }): Promise<ParkingLot[]> {
    const parkingLots = await this.prisma.parkingLot.findMany({
      where: conditions,
    });

    return parkingLots.map(parkingLot =>
      ParkingLot.fromPrisma({
        ...parkingLot,
        description: parkingLot.description ?? undefined,
      }),
    );
  }

  async create(parkingLot: ParkingLotProps): Promise<ParkingLot> {
    const created = await this.prisma.parkingLot.create({
      data: parkingLot,
    });

    return ParkingLot.fromPrisma({
      ...created,
      description: created.description ?? undefined,
    });
  }

  async createMany(parkingLots: ParkingLotProps[]): Promise<ParkingLot[]> {
    const created = await this.prisma.parkingLot.createManyAndReturn({
      data: parkingLots,
    });

    return created.map(parkingLot =>
      ParkingLot.fromPrisma({
        ...parkingLot,
        description: parkingLot.description ?? undefined,
      }),
    );
  }

  async update(id: string, parkingLot: Partial<ParkingLot>): Promise<ParkingLot> {
    const updated = await this.prisma.parkingLot.update({
      where: { id },
      data: parkingLot,
    });

    return ParkingLot.fromPrisma({
      ...updated,
      description: updated.description ?? undefined,
    });
  }

  async delete(id: string, apartmentId: string): Promise<boolean> {
    await this.prisma.parkingLot.update({
      where: { id, apartmentId },
      data: { deletedAt: new Date() },
    });
    return true;
  }
}
