import { ApiProperty } from '@nestjs/swagger';
import { ApartmentResponseDto } from '../../../apartments/application/dto/apartment-response.dto';
import { Pet } from '../../domain/entities/pet.entity';
import { petSpecies, PetSpeciesType } from '../../domain/enums/pet-species.enum';

export class PetResponseDto {
  @ApiProperty({ example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f', description: "Pet's unique ID" })
  id: string;

  @ApiProperty({ example: 'Max', description: "Pet's name" })
  name: string;

  @ApiProperty({ enum: petSpecies, example: petSpecies.DOG, description: "Pet's species" })
  species: PetSpeciesType;

  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Apartment's unique ID",
  })
  apartmentId: string;

  @ApiProperty({ type: ApartmentResponseDto, nullable: true, description: 'Assigned apartment' })
  apartment: ApartmentResponseDto | null;

  constructor(pet: Pet) {
    this.id = pet.id || '';
    this.name = pet.name;
    this.species = pet.species;
    this.apartmentId = pet.apartmentId;
    this.apartment = pet.apartment ? ApartmentResponseDto.fromEntities(pet.apartment) : null;
  }

  static fromEntities(pet: Pet): PetResponseDto {
    return new PetResponseDto(pet);
  }
}
