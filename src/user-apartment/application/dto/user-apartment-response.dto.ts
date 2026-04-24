import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApartmentResponseDto } from '../../../apartments/application/dto/apartment-response.dto';
import {
  userApartmentTypes,
  UserApartmentTypes,
} from '../../../category-user/domain/enums/user-apartment-type.enum';
import { UserResponseDto } from '../../../users/application/dto/user-response.dto';
import { UserApartment } from '../../domain/entities/user-apartment.entity';

export class UserApartmentResponseDto {
  @ApiProperty({ example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f', description: 'Unique ID' })
  @IsString()
  id?: string;

  @ApiPropertyOptional({
    enum: userApartmentTypes,
    example: userApartmentTypes.OWNER,
    description: "Category user's name",
  })
  @IsEnum(userApartmentTypes)
  @IsOptional()
  categoryUserName?: UserApartmentTypes;

  @ApiPropertyOptional({ type: UserResponseDto, description: 'User info' })
  user?: UserResponseDto;

  @ApiPropertyOptional({ type: ApartmentResponseDto, description: 'Apartment info' })
  apartment?: ApartmentResponseDto;

  constructor(userApartment: UserApartment) {
    this.id = userApartment.id;
    this.categoryUserName = userApartment.categoryUserName;
    this.user = userApartment.user
      ? UserResponseDto.fromEntities({
          id: userApartment.user.id,
          username: userApartment.user.username,
          email: userApartment.user.email,
          isActive: userApartment.user.isActive,
          userDetail: userApartment.user.userDetail ?? undefined,
        })
      : undefined;
    this.apartment = userApartment.apartment
      ? ApartmentResponseDto.fromEntities(userApartment.apartment)
      : undefined;
  }

  static fromEntity(userApartment: UserApartment): UserApartmentResponseDto {
    return new UserApartmentResponseDto(userApartment);
  }
}
