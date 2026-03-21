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

  async execute(id: string, residentialComplexId: string): Promise<ApartmentResponseDto> {
    const apartment = await this.apartmentRepositoryInterface.findUnique({
      conditions: { id, residentialComplexId },
    });

    if (!apartment) {
      throw new DomainException(
        `Apartment: ${id} doesn't belongs to Residential Complex: ${residentialComplexId}`,
      );
    }

    return ApartmentResponseDto.fromEntities(apartment);
  }
}
