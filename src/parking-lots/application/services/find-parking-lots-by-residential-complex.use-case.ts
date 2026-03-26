import { Inject, Injectable } from '@nestjs/common';
import { ParkingLotRepositoryInterface } from '../../domain/repositories/parking-lot.repository-interface';
import { ParkingLotResponseDto } from '../dto/parking-lot-response.dto';

@Injectable()
export class FindParkingLotsByResidentialComplexUseCase {
  constructor(
    @Inject('ParkingLotRepositoryInterface')
    private readonly parkingLotRepository: ParkingLotRepositoryInterface,
  ) {}

  async execute(residentialComplexId: string): Promise<ParkingLotResponseDto[]> {
    const parkingLots = await this.parkingLotRepository.findMany({
      conditions: { residentialComplexId, deletedAt: null },
    });

    return parkingLots.map(parkingLot => ParkingLotResponseDto.fromEntities(parkingLot));
  }
}
