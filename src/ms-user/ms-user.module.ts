import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '../prisma/prisma.module';
import { LoginUseCase } from './auth/application/services/login.use-case';
import { SignupUseCase } from './auth/application/services/signup.use-case';
import { AuthController } from './auth/infrastructure/http/auth.controller';
import { JwtStrategy } from './auth/infrastructure/strategies/jwt.strategy';
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
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '1h'
          }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    SignupUseCase,
    LoginUseCase,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserPrismaRepository,
    },
    JwtStrategy
  ],
  exports: [JwtStrategy, PassportModule, JwtModule]
})
export class MsUserModule {}
