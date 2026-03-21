import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { TowerRepositoryInterface } from '../../../towers/domain/repositories/tower.repository-interface';

@Injectable()
export class DeleteTowerUseCase {
  constructor(
    @Inject('TowerRepositoryInterface')
    private readonly towerRepositoryInterface: TowerRepositoryInterface,
  ) {}

  async execute(id: string, residentialComplexId: string): Promise<boolean> {
    const tower = await this.towerRepositoryInterface.findUnique({
      conditions: { id, residentialComplexId },
    });

    if (!tower) {
      throw new DomainException(
        `Tower: ${id} doesn't belongs to Residential Complex: ${residentialComplexId}`,
      );
    }

    return this.towerRepositoryInterface.delete(id, residentialComplexId);
  }
}
