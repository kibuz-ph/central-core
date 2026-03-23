import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { ParkingLotRepositoryInterface } from '../../domain/repositories/parking-lot.repository-interface';
import { UpdateParkingLotDto } from '../dto/update-parking-lot.dto';

@Injectable()
export class UpdateParkingLotUseCase {
  constructor(
    @Inject('ParkingLotRepositoryInterface')
    private readonly parkingLotRepository: ParkingLotRepositoryInterface,
  ) {}

  async execute(
    id: string,
    apartmentId: string,
    updateParkingLot: UpdateParkingLotDto,
  ): Promise<boolean> {
    const parkingLot = await this.parkingLotRepository.findUnique({
      conditions: { id, apartmentId },
    });

    if (!parkingLot) {
      throw new DomainException(`Parking lot: ${id} doesn't belong to Apartment: ${apartmentId}`);
    }

    await this.parkingLotRepository.update(id, updateParkingLot);

    return true;
  }
}
