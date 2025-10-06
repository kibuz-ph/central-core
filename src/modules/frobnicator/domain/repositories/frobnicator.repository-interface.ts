import { Frobnicator } from '../entities/frobnicator.entity';

export interface FrobnicatorRepositoryInterface {
  save(frobnicator: Frobnicator): Promise<Frobnicator>;
  findById(id: string): Promise<Frobnicator | null>;
  findAll(): Promise<Frobnicator[]>;
  findPaginated(page: number, perPage: number): Promise<Frobnicator[]>;
  count(): Promise<number>;
}
