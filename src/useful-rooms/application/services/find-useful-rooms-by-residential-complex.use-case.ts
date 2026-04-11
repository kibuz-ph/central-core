import { Inject, Injectable } from '@nestjs/common';
import { PaginatedResponseDto } from '../../../common/dtos/paginates-response.dto';
import { PaginationMetadata } from '../../../common/types/pagination-metadata';
import { UsefulRoomRepositoryInterface } from '../../domain/repositories/useful-room.repository-interface';
import { UsefulRoomFilterQueryDto } from '../dto/useful-room-filter-query.dto';
import { UsefulRoomResponseDto } from '../dto/useful-room-response.dto';

@Injectable()
export class FindUsefulRoomsByResidentialComplexUseCase {
  constructor(
    @Inject('UsefulRoomRepositoryInterface')
    private readonly usefulRoomRepository: UsefulRoomRepositoryInterface,
  ) {}

  async execute(
    residentialComplexId: string,
    { page, perPage, reference, description }: UsefulRoomFilterQueryDto,
  ): Promise<PaginatedResponseDto<UsefulRoomResponseDto>> {
    const conditions = {
      deletedAt: null,
      apartment: { residentialComplexId },
      ...(reference && { reference: { contains: reference, mode: 'insensitive' } }),
      ...(description && { description: { contains: description, mode: 'insensitive' } }),
    };
    const totalItems = await this.usefulRoomRepository.count(conditions);
    const usefulRooms = await this.usefulRoomRepository.findMany({
      conditions,
      include: { apartment: true },
      page,
      perPage,
    });
    const pagination = PaginationMetadata.create(page, perPage, totalItems);

    return new PaginatedResponseDto<UsefulRoomResponseDto>(
      usefulRooms.map(usefulRoom => UsefulRoomResponseDto.fromEntities(usefulRoom)),
      pagination,
    );
  }
}
