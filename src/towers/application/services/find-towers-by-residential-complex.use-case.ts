import { Inject, Injectable } from '@nestjs/common';
import { TowerRepositoryInterface } from '../../domain/repositories/tower.repository-interface';
import { TowerResponseDto } from '../dto/tower-response.dto';

@Injectable()
export class FindTowersByResidentialComplexUseCase {
  constructor(
    @Inject('TowerRepositoryInterface')
    private readonly towerRepository: TowerRepositoryInterface,
  ) {}

  async execute(residentialComplexId: string): Promise<TowerResponseDto[]> {
    const towers = await this.towerRepository.findMany({
      conditions: { residentialComplexId },
    });

    return towers.map(tower => TowerResponseDto.fromEntities(tower));
  }
}
