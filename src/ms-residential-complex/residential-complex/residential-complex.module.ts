import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ResidentialComplexController } from '../presentation/residential-complex.controller';
import { FindResidentialComplexUseCase } from './application/services/find-residential-complex.use-case';
import { ResidentialComplexPrismaRepository } from './infrastructure/persistence/residential-complex.repository.prisma';

@Module({
  controllers: [ResidentialComplexController],
  imports: [PrismaModule],
  providers: [
    FindResidentialComplexUseCase,
    {
      provide: 'ResidentialComplexInterface',
      useClass: ResidentialComplexPrismaRepository,
    },
  ],
})
export class ResidentialComplexModule {}
