import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../common/dtos/paginates-response.dto';
import { ParkingLotResponseDto } from '../../../parking-lots/application/dto/parking-lot-response.dto';

export class GetResidentialComplexParkingLotsResponseDto extends PaginatedResponseDto<ParkingLotResponseDto> {
  @ApiProperty({ type: [ParkingLotResponseDto], description: "Residential complex's parking lots" })
  declare items: ParkingLotResponseDto[];
}
