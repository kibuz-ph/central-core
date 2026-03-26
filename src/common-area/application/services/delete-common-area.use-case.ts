import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { CommonAreaRepositoryInterface } from '../../domain/repositories/common-area.repository-interface';

@Injectable()
export class DeleteCommonAreaUseCase {
  constructor(
    @Inject('CommonAreaRepositoryInterface')
    private readonly commonAreaRepositoryInterface: CommonAreaRepositoryInterface,
  ) {}

  async execute(id: string, residentialComplexId: string): Promise<boolean> {
    const commonArea = await this.commonAreaRepositoryInterface.findUnique({
      conditions: { id, residentialComplexId },
    });

    if (!commonArea) {
      throw new DomainException(
        `Common Area: ${id} doesn't belongs to Residential Complex: ${residentialComplexId}`,
      );
    }

    return this.commonAreaRepositoryInterface.delete(id, residentialComplexId);
  }
}
