import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateApartmentDto {
  @ApiProperty({
    example: 10,
    description: 'Apartment floor',
  })
  @IsNumber()
  @IsNotEmpty()
  floor: number;

  @ApiProperty({
    example: '1011',
    description: 'Apartment reference',
  })
  @IsString()
  @IsNotEmpty()
  reference: string;

  @ApiProperty({
    example: '68 mt2',
    description: 'Apartment size',
  })
  @IsString()
  @IsNotEmpty()
  size: string;

  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Tower's unique ID",
  })
  @IsString()
  @IsOptional()
  towerId?: string;
}
