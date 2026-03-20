import { Inject, Injectable } from '@nestjs/common';
import { ApartmentRepositoryInterface } from '../../../apartments/domain/repositories/apartment.repository-interface';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';

@Injectable()
export class DeleteApartmentUseCase {
  constructor(
    @Inject('ApartmentRepositoryInterface')
    private readonly apartmentRepositoryInterface: ApartmentRepositoryInterface,
  ) {}

  async execute(id: string, residentialComplexId: string): Promise<boolean> {
    const apartment = await this.apartmentRepositoryInterface.findUnique({
      conditions: { id, residentialComplexId },
    });

    if (!apartment) {
      throw new DomainException(`Apartment: ${id} doesn't belongs to Residential Complex: ${residentialComplexId}`);
    }

    return this.apartmentRepositoryInterface.delete(id, residentialComplexId);
  }
}
