import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dtos/pagination-query.dto';

export class UsefulRoomFilterQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ example: 'Laundry Room', description: 'Filter by reference (partial match)' })
  @IsOptional()
  @IsString()
  reference?: string;

  @ApiPropertyOptional({ example: 'Shared laundry', description: 'Filter by description (partial match)' })
  @IsOptional()
  @IsString()
  description?: string;
}
