import { Inject, Injectable } from '@nestjs/common';
import { ApartmentRepositoryInterface } from '../../../apartments/domain/repositories/apartment.repository-interface';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { TowerRepositoryInterface } from '../../../towers/domain/repositories/tower.repository-interface';
import { ApartmentResponseDto } from '../dto/apartment-response.dto';
import { CreateApartmentDto } from '../dto/create-apartment.dto';

@Injectable()
export class CreateApartmentUseCase {
  constructor(
    @Inject('ApartmentRepositoryInterface')
    private readonly apartmentRepositoryInterface: ApartmentRepositoryInterface,
    @Inject('TowerRepositoryInterface')
    private readonly towerRepositoryInterface: TowerRepositoryInterface,
  ) {}

  async execute(
    towerId: string,
    residentialComplexId: string,
    createApartments: CreateApartmentDto[],
  ): Promise<ApartmentResponseDto[]> {
    const towerExists = await this.towerRepositoryInterface.findByIdAndResidentialComplexId(towerId, residentialComplexId);

    if (!towerExists) {
      throw new DomainException(`Tower: ${towerId} not found`);
    }

    const apartments = await this.apartmentRepositoryInterface.createMany(
      createApartments.map(apartment => ({ ...apartment, towerId, residentialComplexId })),
    );

    return apartments.map(apartment => ApartmentResponseDto.fromEntities(apartment));
  }
}
