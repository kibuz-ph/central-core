import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUserDetailUseCase } from '../user-details/application/services/create-user-detail.use-case';
import { UpdateUserDetailUseCase } from '../user-details/application/services/update-user-detail.use-case';
import { UserDetailPrismaRepository } from '../user-details/infrastructure/persistence/user_detail.repository.prisma';
import { ActivateUserUseCase } from './application/services/activate-user.use-case';
import { CreateUserUseCase } from './application/services/create-user.use-case';
import { DeleteUserUseCase } from './application/services/delete-user.use-case';
import { FindUsersUseCase } from './application/services/find-users.use-case';
import { UpdateUserUseCase } from './application/services/update-user.use-case';
import { UserPrismaRepository } from './infrastructure/persistence/user.repository.prisma';
import { UsersController } from './presentation/users.controller';

@Module({
  controllers: [UsersController],
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    FindUsersUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    ActivateUserUseCase,
    DeleteUserUseCase,
    CreateUserDetailUseCase,
    UpdateUserDetailUseCase,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserPrismaRepository,
    },
    {
      provide: 'UserDetailRepositoryInterface',
      useClass: UserDetailPrismaRepository,
    },
  ],
})
export class UsersModule {}
