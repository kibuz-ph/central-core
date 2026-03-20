import { Apartment } from '../../../apartments/domain/entities/apartment.entity';

export interface ApartmentRepositoryInterface {
  findUnique({ conditions, include }: { conditions: any; include?: any }): Promise<Apartment | null>;
  createMany(apartments: Apartment[]): Promise<Apartment[]>;
  update(id: string, apartment: Partial<Apartment>): Promise<Apartment>;
  delete(id: string, residentialComplexId: string): Promise<boolean>;
}
