import { ApiProperty } from '@nestjs/swagger';
import { PetResponseDto } from '../../../pets/application/dto/pet-response.dto';

export class GetApartmentPetsResponseDto {
  @ApiProperty({ type: [PetResponseDto], description: "Apartment's pets" })
  items: PetResponseDto[];
}
