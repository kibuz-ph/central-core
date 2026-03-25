import { ApiProperty } from '@nestjs/swagger';
import { ParkingLot, ParkingLotType } from '../../domain/entities/parking-lot.entity';

export class ParkingLotResponseDto {
  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Parking lot's unique ID",
  })
  id: string;

  @ApiProperty({
    example: 'P-101',
    description: 'Parking lot reference',
  })
  reference: string;

  @ApiProperty({
    example: 'Near the entrance',
    description: 'Parking lot description',
  })
  description?: string;

  @ApiProperty({
    enum: ParkingLotType,
    example: ParkingLotType.SINGLE,
    description: 'Parking lot type',
  })
  type: ParkingLotType;

  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Apartment's unique ID",
  })
  apartmentId: string;

  constructor(parkingLot: ParkingLot) {
    this.id = parkingLot.id || '';
    this.reference = parkingLot.reference;
    this.description = parkingLot.description;
    this.type = parkingLot.type;
    this.apartmentId = parkingLot.apartmentId;
  }

  static fromEntities(parkingLot: ParkingLot): ParkingLotResponseDto {
    return new ParkingLotResponseDto(parkingLot);
  }
}
