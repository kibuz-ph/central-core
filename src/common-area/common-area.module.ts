import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateCommonAreaUseCase } from './application/services/create-common-area.use-case';
import { FindCommonAreasByResidentialComplexUseCase } from './application/services/find-common-areas-by-residential-complex.use-case';
import { DeleteCommonAreaUseCase } from './application/services/delete-common-area.use-case';
import { GetCommonAreaUseCase } from './application/services/get-common-area.use-case';
import { UpdateCommonAreaUseCase } from './application/services/update-common-area.use-case';
import { CommonAreaPrismaRepository } from './infrastructure/persistence/common-area.repository.prisma';

@Module({
  imports: [PrismaModule],
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
