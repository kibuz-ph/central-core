import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '../prisma/prisma.module';
import { UserPrismaRepository } from '../users/infrastructure/persistence/user.repository.prisma';
import { ActivateUserDetailUseCase } from './application/services/activate-user-detail.use-case';
import { CreateUserDetailUseCase } from './application/services/create-user-detail.use-case';
import { UpdateUserDetailUseCase } from './application/services/update-user-detail.use-case';
import { UserDetailPrismaRepository } from './infrastructure/persistence/user_detail.repository.prisma';
import { UserDetailsController } from './presentation/user-details.controller';

@Module({
  controllers: [UserDetailsController],
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
    ActivateUserDetailUseCase,
    {
      provide: 'UserDetailRepositoryInterface',
      useClass: UserDetailPrismaRepository,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserDetailsModule {}
