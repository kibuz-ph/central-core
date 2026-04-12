import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import {
  userApartmentTypes,
  UserApartmentTypes,
} from '../../../category-user/domain/enums/user-apartment-type.enum';
import { PaginationQueryDto } from '../../../common/dtos/pagination-query.dto';

export class ResidentialComplexUsersFilterQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    example: 'juan@example.com',
    description: "Filter by user's email (partial match)",
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    example: 'Juan',
    description: "Filter by user's first or last name (partial match)",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '601',
    description: 'Filter by apartment reference (partial match)',
  })
  @IsOptional()
  @IsString()
  apartmentReference?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Filter by apartment floor (exact match)',
    type: 'number',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  apartmentFloor?: number;

  @ApiPropertyOptional({
    enum: userApartmentTypes,
    example: userApartmentTypes.OWNER,
    description: 'Filter by category (exact match)',
  })
  @IsOptional()
  @IsEnum(userApartmentTypes)
  categoryName?: UserApartmentTypes;
}
