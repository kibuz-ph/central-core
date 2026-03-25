import { Inject, Injectable } from '@nestjs/common';
import { PetRepositoryInterface } from '../../domain/repositories/pet.repository-interface';
import { PetResponseDto } from '../dto/pet-response.dto';

@Injectable()
export class FindPetsByApartmentUseCase {
  constructor(
    @Inject('PetRepositoryInterface')
    private readonly petRepository: PetRepositoryInterface,
  ) {}

  async execute(apartmentId: string): Promise<PetResponseDto[]> {
    const pets = await this.petRepository.findMany({
      conditions: { apartmentId, deletedAt: null },
    });

    return pets.map(pet => PetResponseDto.fromEntities(pet));
  }
}
