import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { Config } from './config/config';
import { CustomCacheModule } from './modules/cache/cahce.module';
import { FrobnicatorModule } from './modules/frobnicator/frobnicator.module';
import { PinoModule } from './modules/pino/pino.module';
import { MsUserModule } from './ms-user/ms-user.module';

@Module({
  imports: [
    MsUserModule,
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
