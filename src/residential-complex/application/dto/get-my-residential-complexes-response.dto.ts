import { ApiProperty } from '@nestjs/swagger';
import { ResidentialComplexResponseDto } from './residential-complex-response.dto';

export class GetMyResidentialComplexesResponseDto {
  @ApiProperty({
    type: [ResidentialComplexResponseDto],
    description: "User's residential complexes",
  })
  items: ResidentialComplexResponseDto[];
}
