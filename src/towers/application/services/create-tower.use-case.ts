import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { ResidentialComplexInterface } from '../../../residential-complex/domain/repositories/residential-complex.repository-interface';
import { TowerRepositoryInterface } from '../../../towers/domain/repositories/tower.repository-interface';
import { CreateTowerDto } from '../dto/create-tower.dto';
import { TowerResponseDto } from '../dto/tower-response.dto';

@Injectable()
export class CreateTowerUseCase {
  constructor(
    @Inject('TowerRepositoryInterface')
    private readonly towerRepositoryInterface: TowerRepositoryInterface,
    @Inject('ResidentialComplexInterface')
    private readonly residentialComplexInterface: ResidentialComplexInterface,
  ) {}

  async execute(
    residentialComplexId: string,
    createTowers: CreateTowerDto[],
  ): Promise<TowerResponseDto[]> {
    const residentialComplexExists = await this.residentialComplexInterface.findUnique({
      conditions: { id: residentialComplexId },
    });

    if (!residentialComplexExists) {
      throw new DomainException(`Residential Complex: ${residentialComplexId} not found`);
    }

    const towers = await this.towerRepositoryInterface.createMany(
      createTowers.map(tower => ({ ...tower, residentialComplexId })),
    );

    return towers.map(tower => TowerResponseDto.fromEntities(tower));
  }
}
