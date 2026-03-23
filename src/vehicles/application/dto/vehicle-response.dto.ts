import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { vehicleTypes, VehicleTypes } from '../../domain/enums/vehicle-types.enum';

export class VehicleResponseDto {
  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Vehicle's unique ID",
  })
  id: string;

  @ApiProperty({ enum: vehicleTypes, example: vehicleTypes.CAR, description: 'Vehicle type' })
  type: VehicleTypes;

  @ApiProperty({ example: 'Toyota', description: 'Vehicle brand' })
  brand: string;

  @ApiProperty({ example: 'ABC-123', description: 'Vehicle plate' })
  plate: string;

  @ApiProperty({ example: 'Red', description: 'Vehicle color' })
  color: string;

  @ApiProperty({ example: 'Corolla', description: 'Vehicle reference' })
  reference: string;

  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Apartment's unique ID",
  })
  apartmentId: string;

  constructor(vehicle: Vehicle) {
    this.id = vehicle.id || '';
    this.type = vehicle.type;
    this.brand = vehicle.brand;
    this.plate = vehicle.plate;
    this.color = vehicle.color;
    this.reference = vehicle.reference;
    this.apartmentId = vehicle.apartmentId;
  }

  static fromEntities(vehicle: Vehicle): VehicleResponseDto {
    return new VehicleResponseDto(vehicle);
  }
}
