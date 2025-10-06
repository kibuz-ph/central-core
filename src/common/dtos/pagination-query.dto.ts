/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    example: 1,
    description: 'Page to be retrieved',
    type: 'number',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page must be an integer' })
  @Min(1, { message: 'page must be at least 1' })
  page = 1 as number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
    type: 'number',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'perPage must be an integer' })
  @Min(1, { message: 'perPage must be at least 1' })
  perPage = 10 as number;
}
