import { ApiProperty } from '@nestjs/swagger';
import { TowerResponseDto } from '../../../towers/application/dto/tower-response.dto';
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
  towerId: string | null;

  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Residential Complex's unique ID",
  })
  residentialComplexId: string;

  @ApiProperty({ type: TowerResponseDto, nullable: true, description: "Apartment's tower" })
  tower: TowerResponseDto | null;

  constructor(apartment: Apartment) {
    this.id = apartment.id || '';
    this.floor = apartment.floor;
    this.reference = apartment.reference;
    this.size = apartment.size;
    this.towerId = apartment.towerId ?? null;
    this.residentialComplexId = apartment.residentialComplexId;
    this.tower = apartment.tower ? TowerResponseDto.fromEntities(apartment.tower) : null;
  }

  static fromEntities(apartment: Apartment): ApartmentResponseDto {
    return new ApartmentResponseDto(apartment);
  }
}
