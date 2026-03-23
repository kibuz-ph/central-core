import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateVehicleDto } from './create-vehicle.dto';

export class CreateVehiclesDto {
  @ApiProperty({ description: "Apartment's vehicles" })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateVehicleDto)
  items: CreateVehicleDto[];
}
