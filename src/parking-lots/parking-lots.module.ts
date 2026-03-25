import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ApartmentPrismaRepository } from '../apartments/infrastructure/persistence/apartment.repository.prisma';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateParkingLotsUseCase } from './application/services/create-parking-lots.use-case';
import { DeleteParkingLotUseCase } from './application/services/delete-parking-lot.use-case';
import { FindParkingLotUseCase } from './application/services/find-parking-lot.use-case';
import { UpdateParkingLotUseCase } from './application/services/update-parking-lot.use-case';
import { ParkingLotPrismaRepository } from './infrastructure/persistence/parking-lot.repository.prisma';
import { ParkingLotsController } from './presentation/parking-lots.controller';

@Module({
  controllers: [ParkingLotsController],
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    FindParkingLotUseCase,
    CreateParkingLotsUseCase,
    UpdateParkingLotUseCase,
    DeleteParkingLotUseCase,
    {
      provide: 'ParkingLotRepositoryInterface',
      useClass: ParkingLotPrismaRepository,
    },
    {
      provide: 'ApartmentRepositoryInterface',
      useClass: ApartmentPrismaRepository,
    },
  ],
})
export class ParkingLotsModule {}
