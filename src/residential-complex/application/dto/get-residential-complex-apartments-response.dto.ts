import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../common/dtos/paginates-response.dto';
import { ApartmentResponseDto } from '../../../apartments/application/dto/apartment-response.dto';

export class GetResidentialComplexApartmentsResponseDto extends PaginatedResponseDto<ApartmentResponseDto> {
  @ApiProperty({ type: [ApartmentResponseDto], description: "Residential complex's apartments" })
  declare items: ApartmentResponseDto[];
}
