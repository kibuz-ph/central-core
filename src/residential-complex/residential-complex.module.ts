import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CommonAreaModule } from '../common-area/common-area.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateResidentialComplexUseCase } from './application/services/create-residential-complex.use-case';
import { DeleteResidentialComplexUseCase } from './application/services/delete-residential-complex.use-case';
import { FindResidentialComplexUseCase } from './application/services/find-residential-complex.use-case';
import { UpdateResidentialComplexUseCase } from './application/services/update-residential-complex.use-case';
import { ResidentialComplexPrismaRepository } from './infrastructure/persistence/residential-complex.repository.prisma';
import { ResidentialComplexController } from './presentation/residential-complex.controller';

@Module({
  controllers: [ResidentialComplexController],
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => CommonAreaModule),
  ],
  providers: [
    FindResidentialComplexUseCase,
    CreateResidentialComplexUseCase,
    UpdateResidentialComplexUseCase,
    DeleteResidentialComplexUseCase,
    {
      provide: 'ResidentialComplexInterface',
      useClass: ResidentialComplexPrismaRepository,
    },
  ],
  exports: [
    {
      provide: 'ResidentialComplexInterface',
      useClass: ResidentialComplexPrismaRepository,
    },
  ],
})
export class ResidentialComplexModule {}
