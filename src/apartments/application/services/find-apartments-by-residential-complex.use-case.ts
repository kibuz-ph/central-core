import { Inject, Injectable } from '@nestjs/common';
import { PaginatedResponseDto } from '../../../common/dtos/paginates-response.dto';
import { PaginationMetadata } from '../../../common/types/pagination-metadata';
import { ApartmentRepositoryInterface } from '../../domain/repositories/apartment.repository-interface';
import { ApartmentFilterQueryDto } from '../dto/apartment-filter-query.dto';
import { ApartmentResponseDto } from '../dto/apartment-response.dto';

@Injectable()
export class FindApartmentsByResidentialComplexUseCase {
  constructor(
    @Inject('ApartmentRepositoryInterface')
    private readonly apartmentRepository: ApartmentRepositoryInterface,
  ) {}

  async execute(
    residentialComplexId: string,
    { page, perPage, floor, reference, size }: ApartmentFilterQueryDto,
  ): Promise<PaginatedResponseDto<ApartmentResponseDto>> {
    const conditions = {
      residentialComplexId,
      deletedAt: null,
      ...(floor !== undefined && { floor }),
      ...(reference && { reference: { contains: reference, mode: 'insensitive' } }),
      ...(size && { size: { contains: size, mode: 'insensitive' } }),
    };
    const totalItems = await this.apartmentRepository.count(conditions);
    const apartments = await this.apartmentRepository.findMany({
      conditions,
      include: { tower: true },
      page,
      perPage,
    });
    const pagination = PaginationMetadata.create(page, perPage, totalItems);

    return new PaginatedResponseDto<ApartmentResponseDto>(
      apartments.map(apartment => ApartmentResponseDto.fromEntities(apartment)),
      pagination,
    );
  }
}
