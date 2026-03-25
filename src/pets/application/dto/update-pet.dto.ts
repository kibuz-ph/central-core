import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { petSpecies, PetSpeciesType } from '../../domain/enums/pet-species.enum';

export class UpdatePetDto {
  @ApiProperty({ example: 'Max', description: "Pet's name", required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    enum: petSpecies,
    example: petSpecies.DOG,
    description: "Pet's species",
    required: false,
  })
  @IsEnum(petSpecies)
  @IsOptional()
  species?: PetSpeciesType;
}
