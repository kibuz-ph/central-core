import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { DeleteUsersUseCase } from './application/services/delete-users.use-case';
import { FindUsersUseCase } from './application/services/find-users.use-case';
import { UserPrismaRepository } from './infrastructure/persistence/user.repository.prisma';
import { UsersController } from './presentation/users.controller';

@Module({
  controllers: [UsersController],
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    FindUsersUseCase,
    DeleteUsersUseCase,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserPrismaRepository,
    },
  ],
})
export class UsersModule {}
