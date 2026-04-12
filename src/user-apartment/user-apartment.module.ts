import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUserApartmentUseCase } from './application/services/create-user-apartment.use-case';
import { DeleteUserApartmentUseCase } from './application/services/delete-user-apartment.use-case';
import { FindUserApartmentsByApartmentUseCase } from './application/services/find-user-apartments-by-apartment.use-case';
import { UserApartmentPrismaRepository } from './infrastructure/persistence/user-apartment.repository.prisma';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    CreateUserApartmentUseCase,
    DeleteUserApartmentUseCase,
    FindUserApartmentsByApartmentUseCase,
    {
      provide: 'UserApartmentRepositoryInterface',
      useClass: UserApartmentPrismaRepository,
    },
  ],
  exports: [
    CreateUserApartmentUseCase,
    DeleteUserApartmentUseCase,
    FindUserApartmentsByApartmentUseCase,
  ],
})
export class UserApartmentModule {}
