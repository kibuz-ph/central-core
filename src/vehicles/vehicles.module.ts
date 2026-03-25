import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ApartmentPrismaRepository } from '../apartments/infrastructure/persistence/apartment.repository.prisma';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateVehiclesUseCase } from './application/services/create-vehicles.use-case';
import { DeleteVehicleUseCase } from './application/services/delete-vehicle.use-case';
import { FindVehicleUseCase } from './application/services/find-vehicle.use-case';
import { FindVehiclesByApartmentUseCase } from './application/services/find-vehicles-by-apartment.use-case';
import { UpdateVehicleUseCase } from './application/services/update-vehicle.use-case';
import { VehiclePrismaRepository } from './infrastructure/persistence/vehicle.repository.prisma';
import { VehiclesController } from './presentation/vehicles.controller';

@Module({
  controllers: [VehiclesController],
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    FindVehicleUseCase,
    FindVehiclesByApartmentUseCase,
    CreateVehiclesUseCase,
    UpdateVehicleUseCase,
    DeleteVehicleUseCase,
    {
      provide: 'VehicleRepositoryInterface',
      useClass: VehiclePrismaRepository,
    },
    {
      provide: 'ApartmentRepositoryInterface',
      useClass: ApartmentPrismaRepository,
    },
  ],
})
export class VehiclesModule {}
