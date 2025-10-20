import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Config } from '../../config/config';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserPrismaRepository } from '../user/infrastructure/persistence/user.repository.prisma';
import { CheckAuthStatusUseCase } from './application/services/check-auth-status.use-case';
import { SignupUseCase } from './application/services/signup.use-case';
import { SignInUseCase } from './application/services/singin.use-case';
import { AuthController } from './infrastructure/http/auth.controller';
import { SecurityServices } from './infrastructure/security/services/security.service';
import { JwtStrategy } from './infrastructure/security/strategies/jwt.strategy';
import { LocalStrategy } from './infrastructure/security/strategies/local.strategy';

@Module({
  controllers: [AuthController],
  imports: [
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
  ],
})
export class AuthModule {}
