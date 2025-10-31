import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { CommonAreaRepositoryInterface } from '../../domain/repositories/common-area.repository-interface';
import { UpdateCommonAreaDto } from '../dto/update-common-area.dto';

@Injectable()
export class UpdateCommonAreaUseCase {
  constructor(
    @Inject('CommonAreaRepositoryInterface')
    private readonly commonAreaRepositoryInterface: CommonAreaRepositoryInterface,
  ) {}

  async execute(
    residentialComplexId: string,
    id: string,
    updateCommonArea: UpdateCommonAreaDto,
  ): Promise<boolean> {
    const commonAreaExists =
      await this.commonAreaRepositoryInterface.findByIdAndResidentialComplexId(
        id,
        residentialComplexId,
      );

    if (!commonAreaExists) {
      throw new DomainException(
        `Common Area: ${id} doesn't belongs to Residential Complex: ${residentialComplexId}`,
      );
    }

    await this.commonAreaRepositoryInterface.update(id, residentialComplexId, updateCommonArea);

    return true;
  }
}
