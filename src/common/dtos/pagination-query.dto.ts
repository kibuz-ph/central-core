import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Page to be retrieved',
    type: 'number',
  })
  @Type(() => Number)
  @IsInt({ message: 'page must be an integer' })
  @Min(1, { message: 'page must be at least 1' })
  page = 1 as number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Number of items per page',
    type: 'number',
  })
  @Type(() => Number)
  @IsInt({ message: 'perPage must be an integer' })
  @Min(1, { message: 'perPage must be at least 1' })
  perPage = 10 as number;
}
