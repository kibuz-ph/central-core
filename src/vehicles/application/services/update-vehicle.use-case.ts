import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { VehicleRepositoryInterface } from '../../domain/repositories/vehicle.repository-interface';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';

@Injectable()
export class UpdateVehicleUseCase {
  constructor(
    @Inject('VehicleRepositoryInterface')
    private readonly vehicleRepository: VehicleRepositoryInterface,
  ) {}

  async execute(
    id: string,
    apartmentId: string,
    updateVehicle: UpdateVehicleDto,
  ): Promise<boolean> {
    const vehicle = await this.vehicleRepository.findUnique({
      conditions: { id, apartmentId },
    });

    if (!vehicle) {
      throw new DomainException(`Vehicle: ${id} doesn't belong to Apartment: ${apartmentId}`);
    }

    await this.vehicleRepository.update(id, updateVehicle);

    return true;
  }
}
