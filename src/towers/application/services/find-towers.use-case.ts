import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { TowerRepositoryInterface } from '../../../towers/domain/repositories/tower.repository-interface';
import { TowerResponseDto } from '../dto/tower-response.dto';

@Injectable()
export class FindTowersUseCase {
  constructor(
    @Inject('TowerRepositoryInterface')
    private readonly towerRepositoryInterface: TowerRepositoryInterface,
  ) {}

  async execute(residentialComplexId: string, id: string): Promise<TowerResponseDto> {
    const tower = await this.towerRepositoryInterface.findUnique({
      conditions: { id, residentialComplexId },
    });

    if (!tower) {
      throw new DomainException(
        `Tower: ${id} doesn't belongs to Residential Complex: ${residentialComplexId}`,
      );
    }

    return TowerResponseDto.fromEntities(tower);
  }
}
