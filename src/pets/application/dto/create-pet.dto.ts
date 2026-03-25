import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { petSpecies, PetSpeciesType } from '../../domain/enums/pet-species.enum';

export class CreatePetDto {
  @ApiProperty({ example: 'Max', description: "Pet's name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: petSpecies, example: petSpecies.DOG, description: "Pet's species" })
  @IsEnum(petSpecies)
  species: PetSpeciesType;
}
