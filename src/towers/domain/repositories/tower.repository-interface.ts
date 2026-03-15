import { Tower } from '../../../towers/domain/entities/tower.entity';

export interface TowerRepositoryInterface {
  findByIdAndResidentialComplexId(
    id: string,
    residentialComplexId: string,
  ): Promise<Tower | null>;
  createMany(towers: Tower[]): Promise<Tower[]>;
  update(
    id: string,
    residentialComplexId: string,
    tower: Partial<Tower>
  ): Promise<Tower>;
  delete(id: string, residentialComplexId: string): Promise<boolean>;
}
