import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { PetRepositoryInterface } from '../../domain/repositories/pet.repository-interface';
import { PetResponseDto } from '../dto/pet-response.dto';

@Injectable()
export class FindPetUseCase {
  constructor(
    @Inject('PetRepositoryInterface')
    private readonly petRepository: PetRepositoryInterface,
  ) {}

  async execute(id: string, apartmentId: string): Promise<PetResponseDto> {
    const pet = await this.petRepository.findUnique({
      conditions: { id, apartmentId },
    });

    if (!pet) {
      throw new DomainException(`Pet: ${id} doesn't belong to Apartment: ${apartmentId}`);
    }

    return PetResponseDto.fromEntities(pet);
  }
}
