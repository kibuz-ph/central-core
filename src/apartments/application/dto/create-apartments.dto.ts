import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateApartmentDto } from './create-apartment.dto';

export class CreateApartmentsDto {
  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Residential Complex's unique ID",
  })
  @IsString()
  @IsNotEmpty()
  residentialComplexId: string;
  
  @ApiProperty({
    example: '1011',
    description: "Tower's apartments",
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateApartmentDto)
  items: CreateApartmentDto[];
}
