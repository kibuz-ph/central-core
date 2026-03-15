import { ApiProperty } from '@nestjs/swagger';
import { Tower } from '../../domain/entities/tower.entity';

export class TowerResponseDto {
  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Tower's unique ID",
  })
  id: string;

  @ApiProperty({
    example: 'Tower 1',
    description: 'Tower name',
  })
  name: string;

  @ApiProperty({
    example: 'Some tower description',
    description: 'Some description to tower',
  })
  description?: string;

  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Residential Complex's unique ID",
  })
  residentialComplexId: string;

  constructor(tower: Tower) {
    this.id = tower.id || '';
    this.name = tower.name;
    this.description = tower.description;
    this.residentialComplexId = tower.residentialComplexId;
  }

  static fromEntities(tower: Tower): TowerResponseDto {
    return new TowerResponseDto(tower);
  }
}
