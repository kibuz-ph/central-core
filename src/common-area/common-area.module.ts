import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { ResidentialComplexModule } from '../residential-complex/residential-complex.module';
import { CreateCommonAreaUseCase } from './application/services/create-common-area.use-case';
import { FindCommonAreasByResidentialComplexUseCase } from './application/services/find-common-areas-by-residential-complex.use-case';
import { DeleteCommonAreaUseCase } from './application/services/delete-common-area.use-case';
import { GetCommonAreaUseCase } from './application/services/get-common-area.use-case';
import { UpdateCommonAreaUseCase } from './application/services/update-common-area.use-case';
import { CommonAreaPrismaRepository } from './infrastructure/persistence/common-area.repository.prisma';
import { CommonAreaController } from './presentation/common-area.controller';

@Module({
  controllers: [CommonAreaController],
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ResidentialComplexModule,
  ],
  providers: [
    CreateCommonAreaUseCase,
    FindCommonAreasByResidentialComplexUseCase,
    GetCommonAreaUseCase,
    DeleteCommonAreaUseCase,
    UpdateCommonAreaUseCase,
    {
      provide: 'CommonAreaRepositoryInterface',
      useClass: CommonAreaPrismaRepository,
    },
  ],
})
export class CommonAreaModule {}
