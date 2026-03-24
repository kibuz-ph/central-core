import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreatePetDto } from './create-pet.dto';

export class CreatePetsDto {
  @ApiProperty({ description: "Apartment's pets" })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePetDto)
  items: CreatePetDto[];
}
