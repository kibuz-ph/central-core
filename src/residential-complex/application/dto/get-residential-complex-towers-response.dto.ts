import { ApiProperty } from '@nestjs/swagger';
import { TowerResponseDto } from '../../../towers/application/dto/tower-response.dto';

export class GetResidentialComplexTowersResponseDto {
  @ApiProperty({ type: [TowerResponseDto], description: "Residential complex's towers" })
  items: TowerResponseDto[];
}
