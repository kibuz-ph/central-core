import { Inject, Injectable } from '@nestjs/common';
import { VehicleRepositoryInterface } from '../../domain/repositories/vehicle.repository-interface';
import { VehicleResponseDto } from '../dto/vehicle-response.dto';

@Injectable()
export class FindVehiclesByApartmentUseCase {
  constructor(
    @Inject('VehicleRepositoryInterface')
    private readonly vehicleRepository: VehicleRepositoryInterface,
  ) {}

  async execute(apartmentId: string): Promise<VehicleResponseDto[]> {
    const vehicles = await this.vehicleRepository.findMany({
      conditions: { apartmentId, deletedAt: null },
    });

    return vehicles.map(vehicle => VehicleResponseDto.fromEntities(vehicle));
  }
}
