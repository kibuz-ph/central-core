import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateTowerDto } from './create-tower.dto';

export class CreateTowersDto {
  @ApiProperty({
    example: 'Swimming',
    description: "Residentail complex's towers",
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTowerDto)
  items: CreateTowerDto[];
}
