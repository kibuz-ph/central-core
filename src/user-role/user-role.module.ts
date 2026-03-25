import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUserRoleUseCase } from './application/services/create-user-role.use-case';
import { DeleteUserRoleUseCase } from './application/services/delete-user-role.use-case';
import { FindUserRolesByComplexUseCase } from './application/services/find-user-roles-by-complex.use-case';
import { UserRolePrismaRepository } from './infrastructure/persistence/user-role.repository.prisma';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  providers: [
    CreateUserRoleUseCase,
    DeleteUserRoleUseCase,
    FindUserRolesByComplexUseCase,
    {
      provide: 'UserRoleRepositoryInterface',
      useClass: UserRolePrismaRepository,
    },
  ],
  exports: [CreateUserRoleUseCase, DeleteUserRoleUseCase, FindUserRolesByComplexUseCase],
})
export class UserRoleModule {}
