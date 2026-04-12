import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { CategoryUser } from '../../domain/entities/category-user.entity';
import {
  userApartmentTypes,
  UserApartmentTypes,
} from '../../domain/enums/user-apartment-type.enum';

export class CategoryUserResponseDto {
  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Category user's unique ID",
  })
  @IsString()
  id?: string;

  @ApiProperty({
    enum: userApartmentTypes,
    example: userApartmentTypes.OWNER,
    description: "Category user's name",
  })
  @IsEnum(userApartmentTypes)
  name: UserApartmentTypes;

  constructor(categoryUser: CategoryUser) {
    this.id = categoryUser.id;
    this.name = categoryUser.name;
  }

  static fromEntity(categoryUser: CategoryUser): CategoryUserResponseDto {
    return new CategoryUserResponseDto(categoryUser);
  }
}
