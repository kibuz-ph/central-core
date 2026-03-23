import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { ResidentialComplexPrismaRepository } from '../residential-complex/infrastructure/persistence/residential-complex.repository.prisma';
import { TowerPrismaRepository } from '../towers/infrastructure/persistence/tower.repository.prisma';
import { FindVehicleUseCase } from '../vehicles/application/services/find-vehicle.use-case';
import { VehiclePrismaRepository } from '../vehicles/infrastructure/persistence/vehicle.repository.prisma';
import { CreateApartmentsUseCase } from './application/services/create-apartments.use-case';
import { DeleteApartmentUseCase } from './application/services/delete-apartment.use-case';
import { FindApartmentUseCase } from './application/services/find-apartment.use-case';
import { UpdateApartmentUseCase } from './application/services/update-apartment.use-case';
import { ApartmentPrismaRepository } from './infrastructure/persistence/apartment.repository.prisma';
import { ApartmentsController } from './presentation/apartments.controller';

@Module({
  controllers: [ApartmentsController],
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    FindApartmentUseCase,
    CreateApartmentsUseCase,
    UpdateApartmentUseCase,
    DeleteApartmentUseCase,
    FindVehicleUseCase,
    {
      provide: 'ApartmentRepositoryInterface',
      useClass: ApartmentPrismaRepository,
    },
    {
      provide: 'TowerRepositoryInterface',
      useClass: TowerPrismaRepository,
    },
    {
      provide: 'ResidentialComplexInterface',
      useClass: ResidentialComplexPrismaRepository,
    },
    {
      provide: 'VehicleRepositoryInterface',
      useClass: VehiclePrismaRepository,
    },
  ],
  exports: [
    {
      provide: 'ApartmentRepositoryInterface',
      useClass: ApartmentPrismaRepository,
    },
  ],
})
export class ApartmentsModule {}
