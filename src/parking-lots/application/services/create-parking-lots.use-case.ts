import { Inject, Injectable } from '@nestjs/common';
import { ApartmentRepositoryInterface } from '../../../apartments/domain/repositories/apartment.repository-interface';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { ParkingLotRepositoryInterface } from '../../domain/repositories/parking-lot.repository-interface';
import { ParkingLotResponseDto } from '../dto/parking-lot-response.dto';
import { CreateParkingLotDto } from '../dto/create-parking-lot.dto';

@Injectable()
export class CreateParkingLotsUseCase {
  constructor(
    @Inject('ParkingLotRepositoryInterface')
    private readonly parkingLotRepository: ParkingLotRepositoryInterface,
    @Inject('ApartmentRepositoryInterface')
    private readonly apartmentRepository: ApartmentRepositoryInterface,
  ) {}

  async execute(
    apartmentId: string,
    createParkingLots: CreateParkingLotDto[],
  ): Promise<ParkingLotResponseDto[]> {
    const apartment = await this.apartmentRepository.findUnique({
      conditions: { id: apartmentId },
    });

    if (!apartment) {
      throw new DomainException(`Apartment: ${apartmentId} not found`);
    }

    const parkingLots = await this.parkingLotRepository.createMany(
      createParkingLots.map(parkingLot => ({ ...parkingLot, apartmentId })),
    );

    return parkingLots.map(parkingLot => ParkingLotResponseDto.fromEntities(parkingLot));
  }
}
