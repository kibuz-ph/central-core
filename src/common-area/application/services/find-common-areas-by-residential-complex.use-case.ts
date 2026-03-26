import { Inject, Injectable } from '@nestjs/common';
import { CommonAreaRepositoryInterface } from '../../domain/repositories/common-area.repository-interface';
import { CommonAreaResponseDto } from '../dto/common-area-response.dto';

@Injectable()
export class FindCommonAreasByResidentialComplexUseCase {
  constructor(
    @Inject('CommonAreaRepositoryInterface')
    private readonly commonAreaRepository: CommonAreaRepositoryInterface,
  ) {}

  async execute(residentialComplexId: string): Promise<CommonAreaResponseDto[]> {
    const commonAreas = await this.commonAreaRepository.findMany({
      conditions: { residentialComplexId },
    });

    return commonAreas.map(commonArea => CommonAreaResponseDto.fromEntities(commonArea));
  }
}
