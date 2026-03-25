import { Pet } from '../entities/pet.entity';

export interface PetRepositoryInterface {
  findUnique({ conditions }: { conditions: any }): Promise<Pet | null>;
  findMany({ conditions }: { conditions: any }): Promise<Pet[]>;
  createMany(pets: Pet[]): Promise<Pet[]>;
  update(id: string, pet: Partial<Pet>): Promise<Pet>;
  delete(id: string, apartmentId: string): Promise<boolean>;
}
