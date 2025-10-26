import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../../prisma/prisma.module';
import { CreateResidentialComplexUseCase } from './application/services/create-residential-complex.use-case';
import { FindResidentialComplexUseCase } from './application/services/find-residential-complex.use-case';
import { UpdateResidentialComplexUseCase } from './application/services/update-residential-complex.use-case';
import { ResidentialComplexPrismaRepository } from './infrastructure/persistence/residential-complex.repository.prisma';
import { ResidentialComplexController } from './presentation/residential-complex.controller';

@Module({
  controllers: [ResidentialComplexController],
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    FindResidentialComplexUseCase,
    CreateResidentialComplexUseCase,
    UpdateResidentialComplexUseCase,
    {
      provide: 'ResidentialComplexInterface',
      useClass: ResidentialComplexPrismaRepository,
    },
  ],
})
export class ResidentialComplexModule {}
