import { Inject, Injectable } from '@nestjs/common';
import { ParkingLotRepositoryInterface } from '../../domain/repositories/parking-lot.repository-interface';
import { ParkingLotResponseDto } from '../dto/parking-lot-response.dto';

@Injectable()
export class FindParkingLotsByApartmentUseCase {
  constructor(
    @Inject('ParkingLotRepositoryInterface')
    private readonly parkingLotRepository: ParkingLotRepositoryInterface,
  ) {}

  async execute(apartmentId: string): Promise<ParkingLotResponseDto[]> {
    const parkingLots = await this.parkingLotRepository.findMany({
      conditions: { apartmentId, deletedAt: null },
    });

    return parkingLots.map(parkingLot => ParkingLotResponseDto.fromEntities(parkingLot));
  }
}
