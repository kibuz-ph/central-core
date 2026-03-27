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

  private toDomain(parkingLot: {
    id: string;
    reference: string;
    description: string | null;
    type: ParkingLotProps['type'];
    apartmentId: string | null;
    residentialComplexId: string;
  }): ParkingLot {
    return ParkingLot.fromPrisma({
      id: parkingLot.id,
      reference: parkingLot.reference,
      description: parkingLot.description ?? undefined,
      type: parkingLot.type,
      apartmentId: parkingLot.apartmentId ?? undefined,
      residentialComplexId: parkingLot.residentialComplexId,
    });
  }

  async findUnique({
    conditions,
  }: {
    conditions: Prisma.ParkingLotWhereInput;
  }): Promise<ParkingLot | null> {
    const parkingLot = await this.prisma.parkingLot.findFirst({
      where: conditions,
    });

    if (!parkingLot) return null;

    return this.toDomain(parkingLot);
  }

  async findMany({
    conditions,
  }: {
    conditions: Prisma.ParkingLotWhereInput;
  }): Promise<ParkingLot[]> {
    const parkingLots = await this.prisma.parkingLot.findMany({
      where: conditions,
    });

    return parkingLots.map(parkingLot => this.toDomain(parkingLot));
  }

  async createMany(parkingLots: ParkingLotProps[]): Promise<ParkingLot[]> {
    const created = await this.prisma.parkingLot.createManyAndReturn({
      data: parkingLots,
    });

    return created.map(parkingLot => this.toDomain(parkingLot));
  }

  async update(id: string, parkingLot: Partial<ParkingLot>): Promise<ParkingLot> {
    const updated = await this.prisma.parkingLot.update({
      where: { id },
      data: parkingLot,
    });

    return this.toDomain(updated);
  }

  async delete(id: string, residentialComplexId: string): Promise<boolean> {
    await this.prisma.parkingLot.update({
      where: { id, residentialComplexId },
      data: { deletedAt: new Date() },
    });
    return true;
  }
}
