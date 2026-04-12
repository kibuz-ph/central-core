import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../common/dtos/paginates-response.dto';
import { PetResponseDto } from '../../../pets/application/dto/pet-response.dto';

export class GetResidentialComplexPetsResponseDto extends PaginatedResponseDto<PetResponseDto> {
  @ApiProperty({ type: [PetResponseDto], description: "Residential complex's pets" })
  declare items: PetResponseDto[];
}
