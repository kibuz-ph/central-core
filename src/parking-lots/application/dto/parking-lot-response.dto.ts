import { ApiProperty } from '@nestjs/swagger';
import { ParkingLot } from '../../domain/entities/parking-lot.entity';
import { parkingLotTypes, ParkingLotTypes } from '../../domain/enums/parking-lot-types.enum';

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
    enum: parkingLotTypes,
    example: parkingLotTypes.SINGLE,
    description: 'Parking lot type',
  })
  type: ParkingLotTypes;

  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Apartment's unique ID",
    required: false,
  })
  apartmentId?: string;

  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Residential complex's unique ID",
  })
  residentialComplexId: string;

  constructor(parkingLot: ParkingLot) {
    this.id = parkingLot.id || '';
    this.reference = parkingLot.reference;
    this.description = parkingLot.description;
    this.type = parkingLot.type;
    this.apartmentId = parkingLot.apartmentId;
    this.residentialComplexId = parkingLot.residentialComplexId;
  }

  static fromEntities(parkingLot: ParkingLot): ParkingLotResponseDto {
    return new ParkingLotResponseDto(parkingLot);
  }
}
