import { Prisma } from '../../../prisma/prisma-client/client';
import { Vehicle } from '../entities/vehicle.entity';

export interface VehicleRepositoryInterface {
  findUnique({ conditions }: { conditions: any }): Promise<Vehicle | null>;
  findMany({ conditions }: { conditions: any }): Promise<Vehicle[]>;
  createMany(vehicles: Vehicle[], tx?: Prisma.TransactionClient): Promise<Vehicle[]>;
  update(id: string, vehicle: Partial<Vehicle>, tx?: Prisma.TransactionClient): Promise<Vehicle>;
  delete(id: string, apartmentId: string, tx?: Prisma.TransactionClient): Promise<boolean>;
}
