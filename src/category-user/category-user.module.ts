import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { FindCategoryUserByNameUseCase } from './application/services/find-category-user-by-name.use-case';
import { CategoryUserPrismaRepository } from './infrastructure/persistence/category-user.repository.prisma';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    FindCategoryUserByNameUseCase,
    {
      provide: 'CategoryUserRepositoryInterface',
      useClass: CategoryUserPrismaRepository,
    },
  ],
  exports: [FindCategoryUserByNameUseCase],
})
export class CategoryUserModule {}
