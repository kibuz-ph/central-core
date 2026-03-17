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
    towerId: string,
    updateApartment: UpdateApartmentDto,
  ): Promise<boolean> {
    const apartmentExists = await this.apartmentRepositoryInterface.findByIdAndTowerId(id, towerId);

    if (!apartmentExists) {
      throw new DomainException(`Apartment: ${id} doesn't belongs to Tower: ${towerId}`);
    }

    await this.apartmentRepositoryInterface.update(id, towerId, updateApartment);

    return true;
  }
}
