import { Inject, Injectable } from '@nestjs/common';
import { ApartmentRepositoryInterface } from '../../../apartments/domain/repositories/apartment.repository-interface';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { UpdateApartmentDto } from '../dto/update-apartment.dto';

@Injectable()
export class UpdateApartmentUseCase {
  constructor(
    @Inject('ApartmentRepositoryInterface')
    private readonly apartmentRepositoryInterface: ApartmentRepositoryInterface,
  ) {}

  async execute(
    id: string,
    residentialComplexId: string,
    updateApartment: UpdateApartmentDto,
  ): Promise<boolean> {
    const towerId = updateApartment.towerId;
    if (towerId) {
      const apartmentExists = await this.apartmentRepositoryInterface.findUnique({
        conditions: { id, towerId },
      });

      if (!apartmentExists) {
        throw new DomainException(`Apartment: ${id} doesn't belongs to Tower: ${towerId}`);
      }
    } else {
      const apartmentExists = await this.apartmentRepositoryInterface.findUnique({
        conditions: { id, residentialComplexId },
      });

      if (!apartmentExists) {
        throw new DomainException(
          `Apartment: ${id} doesn't belongs to Residential Complex: ${residentialComplexId}`,
        );
      }
    }

    await this.apartmentRepositoryInterface.update(id, updateApartment);

    return true;
  }
}
