import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { ResidentialComplexInterface } from '../../../residential-complex/domain/repositories/residential-complex.repository-interface';
import { CommonAreaRepositoryInterface } from '../../domain/repositories/common-area.repository-interface';
import { CommonAreaResponseDto } from '../dto/common-area-response.dto';
import { CreateCommonAreaDto } from '../dto/create-common-area.dto';

@Injectable()
export class CreateCommonAreaUseCase {
  constructor(
    @Inject('CommonAreaRepositoryInterface')
    private readonly commonAreaRepositoryInterface: CommonAreaRepositoryInterface,
    @Inject('ResidentialComplexInterface')
    private readonly residentialComplexInterface: ResidentialComplexInterface,
  ) {}

  async execute(
    residentialComplexId: string,
    createCommonAreas: CreateCommonAreaDto[],
  ): Promise<CommonAreaResponseDto[]> {
    const residentialComplexExists = await this.residentialComplexInterface.findUnique({
      conditions: { id: residentialComplexId },
    });

    if (!residentialComplexExists) {
      throw new DomainException(`Residential Complex: ${residentialComplexId} not found`);
    }

    const commonArea = await this.commonAreaRepositoryInterface.createMany(
      createCommonAreas.map(area => ({ ...area, residentialComplexId })),
    );

    return commonArea.map(area => CommonAreaResponseDto.fromEntities(area));
  }
}
