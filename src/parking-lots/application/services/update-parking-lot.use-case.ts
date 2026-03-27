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
    residentialComplexId: string,
    updateParkingLot: UpdateParkingLotDto,
  ): Promise<boolean> {
    const parkingLot = await this.parkingLotRepository.findUnique({
      conditions: { id, residentialComplexId },
    });

    if (!parkingLot) {
      throw new DomainException(
        `Parking lot: ${id} doesn't belong to Residential Complex: ${residentialComplexId}`,
      );
    }

    await this.parkingLotRepository.update(id, updateParkingLot);

    return true;
  }
}
