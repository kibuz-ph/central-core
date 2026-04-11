import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dtos/pagination-query.dto';
import { vehicleTypes, VehicleTypes } from '../../domain/enums/vehicle-types.enum';

export class VehicleFilterQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: vehicleTypes, description: 'Filter by vehicle type' })
  @IsOptional()
  @IsEnum(vehicleTypes)
  type?: VehicleTypes;

  @ApiPropertyOptional({ example: 'Toyota', description: 'Filter by brand (partial match)' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({ example: 'ABC-123', description: 'Filter by plate (partial match)' })
  @IsOptional()
  @IsString()
  plate?: string;

  @ApiPropertyOptional({ example: 'Red', description: 'Filter by color (partial match)' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: 'Corolla', description: 'Filter by reference (partial match)' })
  @IsOptional()
  @IsString()
  reference?: string;
}
