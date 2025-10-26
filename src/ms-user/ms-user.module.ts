import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ResidentialComplexModule } from '../ms-residential-complex/residential-complex/residential-complex.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ResidentialComplexModule,
    PrismaModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
})
export class MsUserModule {}
