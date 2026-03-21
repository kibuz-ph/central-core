import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { TowerRepositoryInterface } from '../../../towers/domain/repositories/tower.repository-interface';
import { UpdateTowerDto } from '../dto/update-tower.dto';

@Injectable()
export class UpdateTowerUseCase {
  constructor(
    @Inject('TowerRepositoryInterface')
    private readonly towerRepositoryInterface: TowerRepositoryInterface,
  ) {}

  async execute(
    id: string,
    residentialComplexId: string,
    updateTower: UpdateTowerDto,
  ): Promise<boolean> {
    const towerExists = await this.towerRepositoryInterface.findUnique({
      conditions: { id, residentialComplexId },
    });

    if (!towerExists) {
      throw new DomainException(
        `Tower: ${id} doesn't belongs to Residential Complex: ${residentialComplexId}`,
      );
    }

    await this.towerRepositoryInterface.update(id, residentialComplexId, updateTower);

    return true;
  }
}
