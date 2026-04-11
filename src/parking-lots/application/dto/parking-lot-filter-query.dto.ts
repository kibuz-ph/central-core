import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dtos/pagination-query.dto';
import { ParkingLotType } from '../../../prisma/prisma-client/client';

export class ParkingLotFilterQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ example: 'P-101', description: 'Filter by reference (partial match)' })
  @IsOptional()
  @IsString()
  reference?: string;

  @ApiPropertyOptional({
    example: 'Near the entrance',
    description: 'Filter by description (partial match)',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    enum: ParkingLotType,
    example: ParkingLotType.SINGLE,
    description: 'Filter by exact type',
  })
  @IsOptional()
  @IsEnum(ParkingLotType)
  type?: ParkingLotType;
}
