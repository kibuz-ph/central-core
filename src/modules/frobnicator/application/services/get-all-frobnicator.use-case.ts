import { Inject, Injectable } from '@nestjs/common';
import { PaginatedResponseDto } from '../../../../common/dtos/paginates-response.dto';
import { PaginationMetadata } from '../../../../common/types/pagination-metadata';
import { FrobnicatorRepositoryInterface } from '../../domain/repositories/frobnicator.repository-interface';
import { FrobnicatorResponseDto } from '../../infrastructure/http/dtos/frobnicator-response.dto';

@Injectable()
export class GetAllFrobnicatorUseCase {
  constructor(
    @Inject('FrobnicatorRepositoryInterface')
    private readonly frobnicatorRepository: FrobnicatorRepositoryInterface,
  ) {}

  async execute(
    page: number,
    perPage: number,
  ): Promise<PaginatedResponseDto<FrobnicatorResponseDto>> {
    const totalItems = await this.frobnicatorRepository.count();
    const frobnicators = await this.frobnicatorRepository.findPaginated(page, perPage);
    const pagination = PaginationMetadata.create(page, perPage, totalItems);

    return new PaginatedResponseDto<FrobnicatorResponseDto>(frobnicators, pagination);
  }
}
