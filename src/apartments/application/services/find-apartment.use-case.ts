import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { ApartmentRepositoryInterface } from '../../domain/repositories/apartment.repository-interface';
import { ApartmentResponseDto } from '../dto/apartment-response.dto';

@Injectable()
export class FindApartmentUseCase {
  constructor(
    @Inject('ApartmentRepositoryInterface')
    private readonly apartmentRepositoryInterface: ApartmentRepositoryInterface,
  ) {}

  async execute(towerId: string, id: string): Promise<ApartmentResponseDto> {
    const apartment = await this.apartmentRepositoryInterface.findByIdAndTowerId(
      id,
      towerId,
    );

    if (!apartment) {
      throw new DomainException(
        `Apartment: ${id} doesn't belongs to Tower: ${towerId}`,
      );
    }

    return ApartmentResponseDto.fromEntities(apartment);
  }
}
