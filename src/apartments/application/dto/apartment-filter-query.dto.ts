import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dtos/pagination-query.dto';

export class ApartmentFilterQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ example: 3, description: 'Filter by exact floor number' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'floor must be an integer' })
  @Min(1, { message: 'floor must be at least 1' })
  floor?: number;

  @ApiPropertyOptional({ example: '101', description: 'Filter by reference (partial match)' })
  @IsOptional()
  @IsString()
  reference?: string;

  @ApiPropertyOptional({ example: '68 mt2', description: 'Filter by size (partial match)' })
  @IsOptional()
  @IsString()
  size?: string;
}
