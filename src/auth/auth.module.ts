import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Config } from '../config/config';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUserDetailUseCase } from '../user-details/application/services/create-user-detail.use-case';
import { UserDetailPrismaRepository } from '../user-details/infrastructure/persistence/user_detail.repository.prisma';
import { UserDetailsModule } from '../user-details/user-details.module';
import { CreateUserUseCase } from '../users/application/services/create-user.use-case';
import { UserPrismaRepository } from '../users/infrastructure/persistence/user.repository.prisma';
import { UsersModule } from '../users/users.module';
import { CheckAuthStatusUseCase } from './application/services/check-auth-status.use-case';
import { SignupUseCase } from './application/services/signup.use-case';
import { SignInUseCase } from './application/services/singin.use-case';
import { SecurityServices } from './infrastructure/security/services/security.service';
import { JwtStrategy } from './infrastructure/security/strategies/jwt.strategy';
import { LocalStrategy } from './infrastructure/security/strategies/local.strategy';
import { AuthController } from './presentation/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    UserDetailsModule,
    PrismaModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => ({
        secret: configService.get('accessTokenSecret', { infer: true }),
        signOptions: {
          expiresIn: configService.get('accessTokenExpiresIn', { infer: true }) ?? '30Min',
        },
      }),
    }),
  ],
  providers: [
    SignInUseCase,
    SignupUseCase,
    CreateUserUseCase,
    CreateUserDetailUseCase,
    CheckAuthStatusUseCase,
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'SecurityServiceInterface',
      useClass: SecurityServices,
    },
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
export class AuthModule {}
