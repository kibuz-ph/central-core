import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { VehicleRepositoryInterface } from '../../domain/repositories/vehicle.repository-interface';
import { VehicleResponseDto } from '../dto/vehicle-response.dto';

@Injectable()
export class FindVehicleUseCase {
  constructor(
    @Inject('VehicleRepositoryInterface')
    private readonly vehicleRepository: VehicleRepositoryInterface,
  ) {}

  async execute(id: string, apartmentId: string): Promise<VehicleResponseDto> {
    const vehicle = await this.vehicleRepository.findUnique({
      conditions: { id, apartmentId },
    });

    if (!vehicle) {
      throw new DomainException(`Vehicle: ${id} doesn't belong to Apartment: ${apartmentId}`);
    }

    return VehicleResponseDto.fromEntities(vehicle);
  }

  async executeByApartment(apartmentId: string): Promise<VehicleResponseDto[]> {
    const vehicles = await this.vehicleRepository.findMany({
      conditions: { apartmentId, deletedAt: null },
    });

    return vehicles.map(vehicle => VehicleResponseDto.fromEntities(vehicle));
  }
}
