import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ResidentialComplexModule } from '../residential-complex/residential-complex.module';
import { CreateCommonAreaUseCase } from './application/services/create-common-area.use-case';
import { DeleteCommonAreaUseCase } from './application/services/delete-common-area.use-case';
import { GetCommonAreaUseCase } from './application/services/get-common-area.use-case';
import { UpdateCommonAreaUseCase } from './application/services/update-common-area.use-case';
import { CommonAreaPrismaRepository } from './infrastructure/persistence/common-area.repository.prisma';

@Module({
  imports: [PrismaModule, forwardRef(() => ResidentialComplexModule)],
  providers: [
    CreateCommonAreaUseCase,
    GetCommonAreaUseCase,
    DeleteCommonAreaUseCase,
    UpdateCommonAreaUseCase,
    {
      provide: 'CommonAreaRepositoryInterface',
      useClass: CommonAreaPrismaRepository,
    },
  ],
  exports: [
    CreateCommonAreaUseCase,
    GetCommonAreaUseCase,
    DeleteCommonAreaUseCase,
    UpdateCommonAreaUseCase,
  ],
})
export class CommonAreaModule {}
