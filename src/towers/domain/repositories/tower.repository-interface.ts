import { Tower } from '../../../towers/domain/entities/tower.entity';

export interface TowerRepositoryInterface {
  findMany({ conditions }: { conditions: any }): Promise<Tower[]>;
  findUnique({ conditions, include }: { conditions: any; include?: any }): Promise<Tower | null>;
  createMany(towers: Tower[]): Promise<Tower[]>;
  update(id: string, residentialComplexId: string, tower: Partial<Tower>): Promise<Tower>;
  delete(id: string, residentialComplexId: string): Promise<boolean>;
}
