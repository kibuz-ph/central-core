import { Vehicle } from '../entities/vehicle.entity';

export interface VehicleRepositoryInterface {
  findUnique({ conditions }: { conditions: any }): Promise<Vehicle | null>;
  findMany({ conditions }: { conditions: any }): Promise<Vehicle[]>;
  create(vehicle: Vehicle): Promise<Vehicle>;
  createMany(vehicles: Vehicle[]): Promise<Vehicle[]>;
  update(id: string, vehicle: Partial<Vehicle>): Promise<Vehicle>;
  delete(id: string, apartmentId: string): Promise<boolean>;
}
