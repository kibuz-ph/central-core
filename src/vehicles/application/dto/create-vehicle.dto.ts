import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { vehicleTypes, VehicleTypes } from '../../domain/enums/vehicle-types.enum';

export class CreateVehicleDto {
  @ApiProperty({ enum: vehicleTypes, example: vehicleTypes.CAR, description: 'Vehicle type' })
  @IsEnum(vehicleTypes)
  @IsNotEmpty()
  type: VehicleTypes;

  @ApiProperty({ example: 'Toyota', description: 'Vehicle brand' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'ABC-123', description: 'Vehicle plate' })
  @IsString()
  @IsNotEmpty()
  plate: string;

  @ApiProperty({ example: 'Red', description: 'Vehicle color' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({ example: 'Corolla', description: 'Vehicle reference' })
  @IsString()
  @IsNotEmpty()
  reference: string;
}
