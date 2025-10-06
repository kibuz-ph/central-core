import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetadata } from '../types/pagination-metadata';

export class PaginatedResponseDto<T> {
  @ApiProperty({ type: () => [Object] })
  items: T[];

  @ApiProperty({ type: PaginationMetadata })
  pagination: PaginationMetadata;

  constructor(items: T[], pagination: PaginationMetadata) {
    this.items = items;
    this.pagination = pagination;
  }
}
