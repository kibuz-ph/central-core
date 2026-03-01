import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { CommonAreaRepositoryInterface } from '../../domain/repositories/common-area.repository-interface';
import { CommonAreaResponseDto } from '../dto/common-area-response.dto';

@Injectable()
export class GetCommonAreaUseCase {
  constructor(
    @Inject('CommonAreaRepositoryInterface')
    private readonly commonAreaRepositoryInterface: CommonAreaRepositoryInterface,
  ) {}

  async execute(residentialComplexId: string, id: string): Promise<CommonAreaResponseDto> {
    const commonArea = await this.commonAreaRepositoryInterface.findByIdAndResidentialComplexId(
      id,
      residentialComplexId,
    );

    if (!commonArea) {
      throw new DomainException(
        `Common Area: ${id} doesn't belongs to Residential Complex: ${residentialComplexId}`,
      );
    }

    return CommonAreaResponseDto.fromEntities(commonArea);
  }
}
