import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUserDetailUseCase } from './application/services/create-user-detail.use-case';
import { UpdateUserDetailUseCase } from './application/services/update-user-detail.use-case';
import { UserDetailPrismaRepository } from './infrastructure/persistence/user_detail.repository.prisma';

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
    CreateUserDetailUseCase,
    UpdateUserDetailUseCase,
    {
      provide: 'UserDetailRepositoryInterface',
      useClass: UserDetailPrismaRepository,
    },
  ],
})
export class UserDetailsModule {}
