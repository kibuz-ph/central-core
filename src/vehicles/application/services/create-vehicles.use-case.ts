import { Inject, Injectable } from '@nestjs/common';
import { ApartmentRepositoryInterface } from '../../../apartments/domain/repositories/apartment.repository-interface';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { VehicleRepositoryInterface } from '../../domain/repositories/vehicle.repository-interface';
import { VehicleResponseDto } from '../dto/vehicle-response.dto';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';

@Injectable()
export class CreateVehiclesUseCase {
  constructor(
    @Inject('VehicleRepositoryInterface')
    private readonly vehicleRepository: VehicleRepositoryInterface,
    @Inject('ApartmentRepositoryInterface')
    private readonly apartmentRepository: ApartmentRepositoryInterface,
  ) {}

  async execute(
    apartmentId: string,
    createVehicles: CreateVehicleDto[],
  ): Promise<VehicleResponseDto[]> {
    const apartment = await this.apartmentRepository.findUnique({
      conditions: { id: apartmentId },
    });

    if (!apartment) {
      throw new DomainException(`Apartment: ${apartmentId} not found`);
    }

    const vehicles = await this.vehicleRepository.createMany(
      createVehicles.map(vehicle => ({ ...vehicle, apartmentId })),
    );

    return vehicles.map(vehicle => VehicleResponseDto.fromEntities(vehicle));
  }
}
