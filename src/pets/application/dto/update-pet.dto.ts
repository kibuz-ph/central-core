import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { petSpecies, PetSpeciesType } from '../../domain/enums/pet-species.enum';

export class UpdatePetDto {
  @ApiPropertyOptional({ example: 'Max', description: "Pet's name", required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    enum: petSpecies,
    example: petSpecies.DOG,
    description: "Pet's species",
    required: false,
  })
  @IsEnum(petSpecies)
  @IsOptional()
  species?: PetSpeciesType;
}
