import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
