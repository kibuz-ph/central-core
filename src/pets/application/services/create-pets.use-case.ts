import { Inject, Injectable } from '@nestjs/common';
import { ApartmentRepositoryInterface } from '../../../apartments/domain/repositories/apartment.repository-interface';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { PetRepositoryInterface } from '../../domain/repositories/pet.repository-interface';
import { PetResponseDto } from '../dto/pet-response.dto';
import { CreatePetDto } from '../dto/create-pet.dto';

@Injectable()
export class CreatePetsUseCase {
  constructor(
    @Inject('PetRepositoryInterface')
    private readonly petRepository: PetRepositoryInterface,
    @Inject('ApartmentRepositoryInterface')
    private readonly apartmentRepository: ApartmentRepositoryInterface,
  ) {}

  async execute(apartmentId: string, createPets: CreatePetDto[]): Promise<PetResponseDto[]> {
    const apartment = await this.apartmentRepository.findUnique({
      conditions: { id: apartmentId },
    });

    if (!apartment) {
      throw new DomainException(`Apartment: ${apartmentId} not found`);
    }

    const pets = await this.petRepository.createMany(
      createPets.map(pet => ({ ...pet, apartmentId })),
    );

    return pets.map(pet => PetResponseDto.fromEntities(pet));
  }
}
