import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { PetRepositoryInterface } from '../../domain/repositories/pet.repository-interface';
import { UpdatePetDto } from '../dto/update-pet.dto';

@Injectable()
export class UpdatePetUseCase {
  constructor(
    @Inject('PetRepositoryInterface')
    private readonly petRepository: PetRepositoryInterface,
  ) {}

  async execute(id: string, apartmentId: string, updatePet: UpdatePetDto): Promise<boolean> {
    const pet = await this.petRepository.findUnique({
      conditions: { id, apartmentId },
    });

    if (!pet) {
      throw new DomainException(`Pet: ${id} doesn't belong to Apartment: ${apartmentId}`);
    }

    await this.petRepository.update(id, updatePet);

    return true;
  }
}
