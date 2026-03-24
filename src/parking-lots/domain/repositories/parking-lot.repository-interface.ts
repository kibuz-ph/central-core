import { ParkingLot } from '../entities/parking-lot.entity';

export interface ParkingLotRepositoryInterface {
  findUnique({ conditions }: { conditions: any }): Promise<ParkingLot | null>;
  findMany({ conditions }: { conditions: any }): Promise<ParkingLot[]>;
  createMany(parkingLots: ParkingLot[]): Promise<ParkingLot[]>;
  update(id: string, parkingLot: Partial<ParkingLot>): Promise<ParkingLot>;
  delete(id: string, apartmentId: string): Promise<boolean>;
}
