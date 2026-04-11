import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../common/dtos/paginates-response.dto';
import { VehicleResponseDto } from '../../../vehicles/application/dto/vehicle-response.dto';

export class GetResidentialComplexVehiclesResponseDto extends PaginatedResponseDto<VehicleResponseDto> {
  @ApiProperty({ type: [VehicleResponseDto], description: "Residential complex's vehicles" })
  declare items: VehicleResponseDto[];
}
