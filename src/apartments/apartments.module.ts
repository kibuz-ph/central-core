import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FindParkingLotsByApartmentUseCase } from '../parking-lots/application/services/find-parking-lots-by-apartment.use-case';
import { ParkingLotPrismaRepository } from '../parking-lots/infrastructure/persistence/parking-lot.repository.prisma';
import { PrismaModule } from '../prisma/prisma.module';
import { ResidentialComplexPrismaRepository } from '../residential-complex/infrastructure/persistence/residential-complex.repository.prisma';
import { TowerPrismaRepository } from '../towers/infrastructure/persistence/tower.repository.prisma';
import { FindUsefulRoomsByApartmentUseCase } from '../useful-rooms/application/services/find-useful-rooms-by-apartment.use-case';
import { UsefulRoomPrismaRepository } from '../useful-rooms/infrastructure/persistence/useful-room.repository.prisma';
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
    FindUsefulRoomsByApartmentUseCase,
    FindParkingLotsByApartmentUseCase,
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
    {
      provide: 'UsefulRoomRepositoryInterface',
      useClass: UsefulRoomPrismaRepository,
    },
    {
      provide: 'ParkingLotRepositoryInterface',
      useClass: ParkingLotPrismaRepository,
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
