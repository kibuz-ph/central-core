import { ApiProperty } from '@nestjs/swagger';
import { DomainException } from '../../modules/pino/domain/exceptions/domain.exception';

export class PaginationMetadata {
  @ApiProperty({ example: 1, description: 'The current page number' })
  currentPage: number;

  @ApiProperty({ example: 10, description: 'The number of items per page' })
  perPage: number;

  @ApiProperty({ example: 5, description: 'The total number of page available' })
  totalPages: number;

  @ApiProperty({ example: 30, description: 'Total Items across all pages' })
  totalItems: number;

  @ApiProperty({
    example: true,
    description: 'Indicates wheter there are more pages availables after the current one',
  })
  hasPage: boolean;

  constructor(
    currentPage: number,
    perPage: number,
    totalPage: number,
    totalItems: number,
    hasPage: boolean,
  ) {
    this.currentPage = currentPage;
    this.perPage = perPage;
    this.totalPages = totalPage;
    this.totalItems = totalItems;
    this.hasPage = hasPage;
  }

  static create(page: number, perPage: number, totalItems: number): PaginationMetadata {
    const totalPages = totalItems > 0 ? Math.ceil(totalItems / perPage) : 1;
    if (page > totalPages && totalPages > 0) {
      throw new DomainException(`Page ${page} is out of range`);
    }
    const hasMore = page < totalPages;
    return new PaginationMetadata(page, perPage, totalPages, totalItems, hasMore);
  }
}
