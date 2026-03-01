import { ApiProperty } from '@nestjs/swagger';
import { CommonArea } from '../../domain/entities/common-area.entity';

export class CommonAreaResponseDto {
  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Common Area's unique ID",
  })
  id: string;

  @ApiProperty({
    example: 'Swimming',
    description: "Residentail complex's common area",
  })
  name: string;

  @ApiProperty({
    example: 'icon-swimming',
    description: "Common area's icon",
  })
  icon?: string;

  @ApiProperty({
    example: 'Some swimming description',
    description: 'Some description to common area',
  })
  description?: string;

  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Common Area's unique ID",
  })
  residentialComplexId: string;

  constructor(commonArea: CommonArea) {
    this.id = commonArea.id || '';
    this.name = commonArea.name;
    this.icon = commonArea.icon;
    this.description = commonArea.description;
    this.residentialComplexId = commonArea.residentialComplexId;
  }

  static fromEntities(commonArea: CommonArea): CommonAreaResponseDto {
    return new CommonAreaResponseDto(commonArea);
  }
}
