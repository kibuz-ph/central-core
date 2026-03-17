import { Apartment } from '../../../apartments/domain/entities/apartment.entity';

export interface ApartmentRepositoryInterface {
  findByIdAndTowerId(
    id: string,
    towerId: string,
  ): Promise<Apartment | null>;
  createMany(apartments: Apartment[]): Promise<Apartment[]>;
  update(
    id: string,
    towerId: string,
    apartment: Partial<Apartment>
  ): Promise<Apartment>;
  delete(id: string, towerId: string): Promise<boolean>;
}
