import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateVehiclesUseCase } from './application/services/create-vehicles.use-case';
import { DeleteVehicleUseCase } from './application/services/delete-vehicle.use-case';
import { FindVehicleUseCase } from './application/services/find-vehicle.use-case';
import { FindVehiclesByApartmentUseCase } from './application/services/find-vehicles-by-apartment.use-case';
import { UpdateVehicleUseCase } from './application/services/update-vehicle.use-case';
import { VehiclePrismaRepository } from './infrastructure/persistence/vehicle.repository.prisma';

@Module({
  imports: [PrismaModule],
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
  ],
})
export class VehiclesModule {}
