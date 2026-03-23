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

  async findMany({ conditions }: { conditions: Prisma.VehicleWhereInput }): Promise<Vehicle[]> {
    const vehicles = await this.prisma.vehicle.findMany({ where: conditions });
    return vehicles.map(vehicle => Vehicle.fromPrisma(vehicle));
  }

  async create(vehicle: VehicleProps): Promise<Vehicle> {
    const created = await this.prisma.vehicle.create({ data: vehicle });
    return Vehicle.fromPrisma(created);
  }

  async createMany(vehicles: VehicleProps[]): Promise<Vehicle[]> {
    const created = await this.prisma.vehicle.createManyAndReturn({ data: vehicles });
    return created.map(vehicle => Vehicle.fromPrisma(vehicle));
  }

  async update(id: string, vehicle: Partial<Vehicle>): Promise<Vehicle> {
    const updated = await this.prisma.vehicle.update({ where: { id }, data: vehicle });
    return Vehicle.fromPrisma(updated);
  }

  async delete(id: string, apartmentId: string): Promise<boolean> {
    await this.prisma.vehicle.update({
      where: { id, apartmentId },
      data: { deletedAt: new Date() },
    });
    return true;
  }
}
