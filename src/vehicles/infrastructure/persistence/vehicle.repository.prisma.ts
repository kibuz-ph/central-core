import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '../../../prisma/prisma-client/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { Vehicle, VehicleProps } from '../../domain/entities/vehicle.entity';
import { VehicleRepositoryInterface } from '../../domain/repositories/vehicle.repository-interface';

@Injectable()
export class VehiclePrismaRepository implements VehicleRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findUnique({
    conditions,
  }: {
    conditions: Prisma.VehicleWhereInput;
  }): Promise<Vehicle | null> {
    const vehicle = await this.prisma.vehicle.findFirst({ where: conditions });
    if (!vehicle) return null;
    return Vehicle.fromPrisma(vehicle);
  }

  async findMany({
    conditions,
    include,
    page,
    perPage,
  }: {
    conditions: Prisma.VehicleWhereInput;
    include?: Prisma.VehicleInclude;
    page?: number;
    perPage?: number;
  }): Promise<Vehicle[]> {
    const skip = page && perPage ? (page - 1) * perPage : undefined;
    const vehicles = await this.prisma.vehicle.findMany({
      where: conditions,
      include,
      skip,
      take: perPage,
    });
    return vehicles.map(vehicle => Vehicle.fromPrisma(vehicle as VehicleProps));
  }

  async count(conditions: Prisma.VehicleWhereInput): Promise<number> {
    return this.prisma.vehicle.count({ where: conditions });
  }

  async createMany(vehicles: VehicleProps[], tx?: Prisma.TransactionClient): Promise<Vehicle[]> {
    const client = tx ?? this.prisma;
    const created = await client.vehicle.createManyAndReturn({ data: vehicles });
    return created.map(vehicle => Vehicle.fromPrisma(vehicle));
  }

  async update(
    id: string,
    vehicle: Partial<Vehicle>,
    tx?: Prisma.TransactionClient,
  ): Promise<Vehicle> {
    const client = tx ?? this.prisma;
    const updated = await client.vehicle.update({ where: { id }, data: vehicle as Prisma.VehicleUpdateInput });
    return Vehicle.fromPrisma(updated);
  }

  async delete(id: string, apartmentId: string, tx?: Prisma.TransactionClient): Promise<boolean> {
    const client = tx ?? this.prisma;
    await client.vehicle.update({
      where: { id, apartmentId },
      data: { deletedAt: new Date() },
    });
    return true;
  }
}
