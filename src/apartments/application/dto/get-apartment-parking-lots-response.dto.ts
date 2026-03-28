import { ApiProperty } from '@nestjs/swagger';
import { ParkingLotResponseDto } from '../../../parking-lots/application/dto/parking-lot-response.dto';

export class GetApartmentParkingLotsResponseDto {
  @ApiProperty({ type: [ParkingLotResponseDto], description: "Apartment's parking lots" })
  items: ParkingLotResponseDto[];
}
