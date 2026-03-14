import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '../prisma/prisma.module';
import { FindRoleByNameUseCase } from './application/services/find-role-by-name.use-case';
import { RolePrismaRepository } from './infrastructure/persistence/role.repository.prisma';

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
    FindRoleByNameUseCase,
    {
      provide: 'RoleRepositoryInterface',
      useClass: RolePrismaRepository,
    },
  ],
  exports: [FindRoleByNameUseCase],
})
export class RoleModule {}
