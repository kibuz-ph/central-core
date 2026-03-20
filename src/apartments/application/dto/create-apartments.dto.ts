import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateApartmentDto } from './create-apartment.dto';

export class CreateApartmentsDto {
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
