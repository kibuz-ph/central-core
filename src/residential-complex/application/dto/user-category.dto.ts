import { ApiProperty } from '@nestjs/swagger';
import {
  userApartmentTypes,
  UserApartmentTypes,
} from '../../../category-user/domain/enums/user-apartment-type.enum';

export class UserCategoryDto {
  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: 'UserApartment record ID',
  })
  id: string;

  @ApiProperty({
    enum: userApartmentTypes,
    example: userApartmentTypes.OWNER,
    description: 'Category assigned to the user in this apartment',
  })
  categoryName: UserApartmentTypes;
}
