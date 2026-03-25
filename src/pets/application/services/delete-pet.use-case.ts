import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { PetRepositoryInterface } from '../../domain/repositories/pet.repository-interface';

@Injectable()
export class DeletePetUseCase {
  constructor(
    @Inject('PetRepositoryInterface')
    private readonly petRepository: PetRepositoryInterface,
  ) {}

  async execute(id: string, apartmentId: string): Promise<boolean> {
    const pet = await this.petRepository.findUnique({
      conditions: { id, apartmentId },
    });

    if (!pet) {
      throw new DomainException(`Pet: ${id} doesn't belong to Apartment: ${apartmentId}`);
    }

    return this.petRepository.delete(id, apartmentId);
  }
}
