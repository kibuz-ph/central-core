import { Inject, Injectable } from '@nestjs/common';
import { PaginatedResponseDto } from '../../../common/dtos/paginates-response.dto';
import { PaginationMetadata } from '../../../common/types/pagination-metadata';
import { PetRepositoryInterface } from '../../domain/repositories/pet.repository-interface';
import { PetFilterQueryDto } from '../dto/pet-filter-query.dto';
import { PetResponseDto } from '../dto/pet-response.dto';

@Injectable()
export class FindPetsByResidentialComplexUseCase {
  constructor(
    @Inject('PetRepositoryInterface')
    private readonly petRepository: PetRepositoryInterface,
  ) {}

  async execute(
    residentialComplexId: string,
    { page, perPage, name, species }: PetFilterQueryDto,
  ): Promise<PaginatedResponseDto<PetResponseDto>> {
    const conditions = {
      deletedAt: null,
      apartment: { residentialComplexId },
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(species && { species }),
    };
    const totalItems = await this.petRepository.count(conditions);
    const pets = await this.petRepository.findMany({
      conditions,
      include: { apartment: true },
      page,
      perPage,
    });
    const pagination = PaginationMetadata.create(page, perPage, totalItems);

    return new PaginatedResponseDto<PetResponseDto>(
      pets.map(pet => PetResponseDto.fromEntities(pet)),
      pagination,
    );
  }
}
