import { Prisma } from '../../../prisma/prisma-client/client';
import { ParkingLot } from '../entities/parking-lot.entity';

export interface ParkingLotRepositoryInterface {
  findUnique({ conditions }: { conditions: any }): Promise<ParkingLot | null>;
  findMany({
    conditions,
    include,
    page,
    perPage,
  }: {
    conditions: any;
    include?: any;
    page?: number;
    perPage?: number;
  }): Promise<ParkingLot[]>;
  count(conditions: any): Promise<number>;
  createMany(parkingLots: ParkingLot[], tx?: Prisma.TransactionClient): Promise<ParkingLot[]>;
  update(
    id: string,
    parkingLot: Partial<ParkingLot>,
    tx?: Prisma.TransactionClient,
  ): Promise<ParkingLot>;
  delete(id: string, residentialComplexId: string, tx?: Prisma.TransactionClient): Promise<boolean>;
}
