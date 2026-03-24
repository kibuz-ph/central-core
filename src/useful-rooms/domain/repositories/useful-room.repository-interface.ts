import { UsefulRoom } from '../entities/useful-room.entity';

export interface UsefulRoomRepositoryInterface {
  findUnique({ conditions }: { conditions: any }): Promise<UsefulRoom | null>;
  findMany({ conditions }: { conditions: any }): Promise<UsefulRoom[]>;
  createMany(usefulRooms: UsefulRoom[]): Promise<UsefulRoom[]>;
  update(id: string, usefulRoom: Partial<UsefulRoom>): Promise<UsefulRoom>;
  delete(id: string, apartmentId: string): Promise<boolean>;
}
