import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateParkingLotDto } from './create-parking-lot.dto';

export class CreateParkingLotsDto {
  @ApiProperty({
    description: "Apartment's parking lots",
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateParkingLotDto)
  items: CreateParkingLotDto[];
}
