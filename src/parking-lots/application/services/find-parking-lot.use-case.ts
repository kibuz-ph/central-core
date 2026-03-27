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

  async execute(id: string, residentialComplexId: string): Promise<ParkingLotResponseDto> {
    const parkingLot = await this.parkingLotRepository.findUnique({
      conditions: { id, residentialComplexId },
    });

    if (!parkingLot) {
      throw new DomainException(
        `Parking lot: ${id} doesn't belong to Residential Complex: ${residentialComplexId}`,
      );
    }

    return ParkingLotResponseDto.fromEntities(parkingLot);
  }
}
