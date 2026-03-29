import { ApiProperty } from '@nestjs/swagger';
import { VehicleResponseDto } from '../../../vehicles/application/dto/vehicle-response.dto';

export class GetApartmentVehiclesResponseDto {
  @ApiProperty({ type: [VehicleResponseDto], description: "Apartment's vehicles" })
  items: VehicleResponseDto[];
}
