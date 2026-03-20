import { Inject, Injectable } from '@nestjs/common';
import { ApartmentRepositoryInterface } from '../../../apartments/domain/repositories/apartment.repository-interface';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { ResidentialComplexInterface } from '../../../residential-complex/domain/repositories/residential-complex.repository-interface';
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
    @Inject('ResidentialComplexInterface')
    private readonly residentialComplexInterface: ResidentialComplexInterface,
  ) {}

  async execute(
    residentialComplexId: string,
    createApartments: CreateApartmentDto[],
  ): Promise<ApartmentResponseDto[]> {
    const towerIds = [...new Set(
      createApartments
        .map(apt => apt.towerId)
        .filter(id => !!id)
    )];

    if (towerIds.length > 0) {
      const foundTowers = await this.towerRepositoryInterface.findMany({
        conditions: {
          id: { in: towerIds },
          residentialComplexId
        }
      });

      if (foundTowers.length !== towerIds.length) {
        throw new DomainException(`One or more towers are invalid or do not belong to this complex.`);
      }
    } else {
      const residentialComplexExists = await this.residentialComplexInterface.findUnique({
        conditions: { id: residentialComplexId },
      });

      if (!residentialComplexExists) {
        throw new DomainException(`Residential complex: ${residentialComplexId} not found`);
      }
    }

    const apartments = await this.apartmentRepositoryInterface.createMany(
      createApartments.map(apartment => ({ ...apartment, residentialComplexId })),
    );

    return apartments.map(apartment => ApartmentResponseDto.fromEntities(apartment));
  }
}
