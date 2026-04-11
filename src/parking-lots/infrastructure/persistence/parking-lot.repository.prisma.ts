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
    const parkingLot = await this.prisma.parkingLot.findFirst({ where: conditions });
    if (!parkingLot) return null;
    return ParkingLot.fromPrisma(parkingLot);
  }

  async findMany({
    conditions,
    include,
    page,
    perPage,
  }: {
    conditions: Prisma.ParkingLotWhereInput;
    include?: Prisma.ParkingLotInclude;
    page?: number;
    perPage?: number;
  }): Promise<ParkingLot[]> {
    const skip = page && perPage ? (page - 1) * perPage : undefined;
    const parkingLots = await this.prisma.parkingLot.findMany({
      where: conditions,
      include,
      skip,
      take: perPage,
    });
    return parkingLots.map(parkingLot => ParkingLot.fromPrisma(parkingLot as any));
  }

  async count(conditions: Prisma.ParkingLotWhereInput): Promise<number> {
    return this.prisma.parkingLot.count({ where: conditions });
  }

  async createMany(
    parkingLots: ParkingLotProps[],
    tx?: Prisma.TransactionClient,
  ): Promise<ParkingLot[]> {
    const client = tx ?? this.prisma;
    const created = await client.parkingLot.createManyAndReturn({ data: parkingLots });
    return created.map(parkingLot => ParkingLot.fromPrisma(parkingLot));
  }

  async update(
    id: string,
    parkingLot: Partial<ParkingLot>,
    tx?: Prisma.TransactionClient,
  ): Promise<ParkingLot> {
    const client = tx ?? this.prisma;
    const updated = await client.parkingLot.update({
      where: { id },
      data: parkingLot as Prisma.ParkingLotUpdateInput,
    });
    return ParkingLot.fromPrisma(updated);
  }

  async delete(
    id: string,
    residentialComplexId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<boolean> {
    const client = tx ?? this.prisma;
    await client.parkingLot.update({
      where: { id, residentialComplexId },
      data: { deletedAt: new Date() },
    });
    return true;
  }
}
