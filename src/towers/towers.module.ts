import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateTowerUseCase } from './application/services/create-tower.use-case';
import { DeleteTowerUseCase } from './application/services/delete-tower.use-case';
import { FindTowersUseCase } from './application/services/find-towers.use-case';
import { UpdateTowerUseCase } from './application/services/update-tower.use-case';
import { TowerPrismaRepository } from './infrastructure/persistence/tower.repository.prisma';

@Module({
  imports: [PrismaModule],
  providers: [
    FindTowersUseCase,
    CreateTowerUseCase,
    UpdateTowerUseCase,
    DeleteTowerUseCase,
    {
      provide: 'TowerRepositoryInterface',
      useClass: TowerPrismaRepository,
    },
  ],
  exports: [
    {
      provide: 'TowerRepositoryInterface',
      useClass: TowerPrismaRepository,
    },
  ],
})
export class TowersModule {}
