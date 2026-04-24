import { Inject, Injectable } from '@nestjs/common';
import { CategoryUser } from '../../domain/entities/category-user.entity';
import { CategoryUserRepositoryInterface } from '../../domain/repositories/category-user.repository-interface';

@Injectable()
export class FindCategoryUserByNameUseCase {
  constructor(
    @Inject('CategoryUserRepositoryInterface')
    private readonly categoryUserRepository: CategoryUserRepositoryInterface,
  ) {}

  async execute(name: string): Promise<CategoryUser | null> {
    return this.categoryUserRepository.findByName(name);
  }
}
