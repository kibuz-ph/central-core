import { ApiProperty } from '@nestjs/swagger';
import { CommonAreaResponseDto } from '../../../common-area/application/dto/common-area-response.dto';

export class GetResidentialComplexCommonAreasResponseDto {
  @ApiProperty({ type: [CommonAreaResponseDto], description: "Residential complex's common areas" })
  items: CommonAreaResponseDto[];
}
