import { ApiProperty } from '@nestjs/swagger';
import { ParkingLotResponseDto } from '../../../parking-lots/application/dto/parking-lot-response.dto';

export class GetResidentialComplexParkingLotsResponseDto {
  @ApiProperty({ type: [ParkingLotResponseDto], description: "Residential complex's parking lots" })
  items: ParkingLotResponseDto[];
}
