import { Inject, Injectable } from '@nestjs/common';
import { PaginatedResponseDto } from '../../../common/dtos/paginates-response.dto';
import { PaginationMetadata } from '../../../common/types/pagination-metadata';
import { ParkingLotRepositoryInterface } from '../../domain/repositories/parking-lot.repository-interface';
import { ParkingLotFilterQueryDto } from '../dto/parking-lot-filter-query.dto';
import { ParkingLotResponseDto } from '../dto/parking-lot-response.dto';

@Injectable()
export class FindParkingLotsByResidentialComplexUseCase {
  constructor(
    @Inject('ParkingLotRepositoryInterface')
    private readonly parkingLotRepository: ParkingLotRepositoryInterface,
  ) {}

  async execute(
    residentialComplexId: string,
    { page, perPage, reference, description, type }: ParkingLotFilterQueryDto,
  ): Promise<PaginatedResponseDto<ParkingLotResponseDto>> {
    const conditions = {
      residentialComplexId,
      deletedAt: null,
      ...(reference && { reference: { contains: reference, mode: 'insensitive' } }),
      ...(description && { description: { contains: description, mode: 'insensitive' } }),
      ...(type && { type }),
    };
    const totalItems = await this.parkingLotRepository.count(conditions);
    const parkingLots = await this.parkingLotRepository.findMany({
      conditions,
      include: { apartment: { include: { tower: true } } },
      page,
      perPage,
    });
    const pagination = PaginationMetadata.create(page, perPage, totalItems);

    return new PaginatedResponseDto<ParkingLotResponseDto>(
      parkingLots.map(parkingLot => ParkingLotResponseDto.fromEntities(parkingLot)),
      pagination,
    );
  }
}
