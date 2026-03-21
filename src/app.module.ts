import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApartmentsModule } from './apartments/apartments.module';
import { AuthModule } from './auth/auth.module';
import configuration, { Config } from './config/config';
import { CustomCacheModule } from './modules/cache/cahce.module';
import { FrobnicatorModule } from './modules/frobnicator/frobnicator.module';
import { PinoModule } from './modules/pino/pino.module';
import { ResidentialComplexModule } from './residential-complex/residential-complex.module';
import { RoleModule } from './role/role.module';
import { TowersModule } from './towers/towers.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { UserRoleModule } from './user-role/user-role.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RoleModule,
    UserDetailsModule,
    UserRoleModule,
    ResidentialComplexModule,
    TowersModule,
    ApartmentsModule,
    FrobnicatorModule,
    CustomCacheModule,
    PinoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
    }),
  ],
  providers: [
    {
      provide: ConfigService,
      useClass: ConfigService<Config>,
    },
  ],
})
export class AppModule {}
