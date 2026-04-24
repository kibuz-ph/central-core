import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import {
  userApartmentTypes,
  UserApartmentTypes,
} from '../../../category-user/domain/enums/user-apartment-type.enum';

export class CreateUserApartmentDto {
  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: 'ID of the user to assign',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    enum: userApartmentTypes,
    example: userApartmentTypes.OWNER,
    description: 'Category of the user in the apartment',
  })
  @IsEnum(userApartmentTypes)
  categoryUserName: UserApartmentTypes;
}
