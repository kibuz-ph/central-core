import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '../prisma/prisma.module';
import { SignupUseCase } from './auth/application/services/signup.use-case';
import { AuthController } from './auth/infrastructure/http/auth.controller';
import { UserPrismaRepository } from './user/infrastructure/persistence/user.repository.prisma';

@Module({
  imports: [
    PrismaModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    SignupUseCase,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserPrismaRepository,
    },
  ],
})
export class MsUserModule {}
