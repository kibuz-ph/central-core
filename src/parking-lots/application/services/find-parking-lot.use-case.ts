import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { ParkingLotRepositoryInterface } from '../../domain/repositories/parking-lot.repository-interface';
import { ParkingLotResponseDto } from '../dto/parking-lot-response.dto';

@Injectable()
export class FindParkingLotUseCase {
  constructor(
    @Inject('ParkingLotRepositoryInterface')
    private readonly parkingLotRepository: ParkingLotRepositoryInterface,
  ) {}

  async execute(id: string, apartmentId: string): Promise<ParkingLotResponseDto> {
    const parkingLot = await this.parkingLotRepository.findUnique({
      conditions: { id, apartmentId },
    });

    if (!parkingLot) {
      throw new DomainException(`Parking lot: ${id} doesn't belong to Apartment: ${apartmentId}`);
    }

    return ParkingLotResponseDto.fromEntities(parkingLot);
  }
}
