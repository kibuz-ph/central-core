import { Inject } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CategoryUser, CategoryUserProps } from '../../domain/entities/category-user.entity';
import { CategoryUserRepositoryInterface } from '../../domain/repositories/category-user.repository-interface';

export class CategoryUserPrismaRepository implements CategoryUserRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findByName(name: string): Promise<CategoryUser | null> {
    const categoryUser = await this.prisma.categoryUser.findUnique({
      where: { name: name as CategoryUser['name'] },
    });

    if (!categoryUser) return null;

    return CategoryUser.fromPrisma(categoryUser as CategoryUserProps);
  }
}
