import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { ResidentialComplexPrismaRepository } from '../residential-complex/infrastructure/persistence/residential-complex.repository.prisma';
import { CreateTowerUseCase } from './application/services/create-tower.use-case';
import { DeleteTowerUseCase } from './application/services/delete-tower.use-case';
import { FindTowersUseCase } from './application/services/find-towers.use-case';
import { UpdateTowerUseCase } from './application/services/update-tower.use-case';
import { TowerPrismaRepository } from './infrastructure/persistence/tower.repository.prisma';
import { TowersController } from './presentation/towers.controller';

@Module({
    controllers: [TowersController],
    imports: [
        PrismaModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [
        FindTowersUseCase,
        CreateTowerUseCase,
        UpdateTowerUseCase,
        DeleteTowerUseCase,
        {
            provide: 'TowerRepositoryInterface',
            useClass: TowerPrismaRepository,
        },
        {
            provide: 'ResidentialComplexInterface',
            useClass: ResidentialComplexPrismaRepository,
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
