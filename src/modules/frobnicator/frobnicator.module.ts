import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CreateFrobnicatorUseCase } from './application/services/create-frobnicator.use-case';
import { GetAllFrobnicatorUseCase } from './application/services/get-all-frobnicator.use-case';
import { FrobnicatorController } from './infrastructure/http/frobnicator.controller';
import { FrobnicatorPrismaResipository } from './infrastructure/persistence/frobnicator.repository.prisma';

@Module({
  imports: [PrismaModule],
  providers: [
    FrobnicatorPrismaResipository,
    {
      provide: 'FrobnicatorRepositoryInterface',
      useClass: FrobnicatorPrismaResipository,
    },
    CreateFrobnicatorUseCase,
    GetAllFrobnicatorUseCase,
  ],
  exports: [CreateFrobnicatorUseCase, GetAllFrobnicatorUseCase, 'FrobnicatorRepositoryInterface'],
  controllers: [FrobnicatorController],
})
export class FrobnicatorModule {}
