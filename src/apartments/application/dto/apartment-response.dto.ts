import { ApiProperty } from '@nestjs/swagger';
import { Apartment } from '../../domain/entities/apartment.entity';

export class ApartmentResponseDto {
  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Apartment's unique ID",
  })
  id: string;

  @ApiProperty({
    example: 10,
    description: 'Apartment floor',
  })
  floor: number;

  @ApiProperty({
    example: '1011',
    description: 'Apartment reference',
  })
  reference: string;

  @ApiProperty({
    example: '68 mt2',
    description: 'Apartment size',
  })
  size: string;

  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Tower's unique ID",
  })
  towerId?: string;

  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Residential Complex's unique ID",
  })
  residentialComplexId: string;

  constructor(apartment: Apartment) {
    this.id = apartment.id || '';
    this.floor = apartment.floor;
    this.reference = apartment.reference;
    this.size = apartment.size;
    this.towerId = apartment.towerId;
    this.residentialComplexId = apartment.residentialComplexId;
  }

  static fromEntities(apartment: Apartment): ApartmentResponseDto {
    return new ApartmentResponseDto(apartment);
  }
}
