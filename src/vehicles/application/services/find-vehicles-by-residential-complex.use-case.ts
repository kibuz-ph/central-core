import { Inject, Injectable } from '@nestjs/common';
import { PaginatedResponseDto } from '../../../common/dtos/paginates-response.dto';
import { PaginationMetadata } from '../../../common/types/pagination-metadata';
import { VehicleRepositoryInterface } from '../../domain/repositories/vehicle.repository-interface';
import { VehicleFilterQueryDto } from '../dto/vehicle-filter-query.dto';
import { VehicleResponseDto } from '../dto/vehicle-response.dto';

@Injectable()
export class FindVehiclesByResidentialComplexUseCase {
  constructor(
    @Inject('VehicleRepositoryInterface')
    private readonly vehicleRepository: VehicleRepositoryInterface,
  ) {}

  async execute(
    residentialComplexId: string,
    { page, perPage, type, brand, plate, color, reference }: VehicleFilterQueryDto,
  ): Promise<PaginatedResponseDto<VehicleResponseDto>> {
    const conditions = {
      deletedAt: null,
      apartment: { residentialComplexId },
      ...(type && { type }),
      ...(brand && { brand: { contains: brand, mode: 'insensitive' } }),
      ...(plate && { plate: { contains: plate, mode: 'insensitive' } }),
      ...(color && { color: { contains: color, mode: 'insensitive' } }),
      ...(reference && { reference: { contains: reference, mode: 'insensitive' } }),
    };
    const totalItems = await this.vehicleRepository.count(conditions);
    const vehicles = await this.vehicleRepository.findMany({
      conditions,
      include: { apartment: true },
      page,
      perPage,
    });
    const pagination = PaginationMetadata.create(page, perPage, totalItems);

    return new PaginatedResponseDto<VehicleResponseDto>(
      vehicles.map(vehicle => VehicleResponseDto.fromEntities(vehicle)),
      pagination,
    );
  }
}
