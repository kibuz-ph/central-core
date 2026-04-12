import { ApiProperty } from '@nestjs/swagger';
import { UserCategoryDto } from './user-category.dto';

export class ApartmentWithCategoriesDto {
  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Apartment's unique ID",
  })
  id: string;

  @ApiProperty({ example: '101', description: "Apartment's reference or number" })
  reference: string;

  @ApiProperty({ example: 1, description: "Apartment's floor number" })
  floor: number;

  @ApiProperty({ example: '68 mt2', description: "Apartment's size" })
  size: string;

  @ApiProperty({
    type: [UserCategoryDto],
    description: 'Categories the user holds in this apartment',
  })
  userCategories: UserCategoryDto[];
}
