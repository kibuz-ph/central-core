import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dtos/pagination-query.dto';
import { petSpecies, PetSpeciesType } from '../../domain/enums/pet-species.enum';

export class PetFilterQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ example: 'Max', description: 'Filter by name (partial match)' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: petSpecies, description: 'Filter by species' })
  @IsOptional()
  @IsEnum(petSpecies)
  species?: PetSpeciesType;
}
