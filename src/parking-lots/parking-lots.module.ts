import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateParkingLotsUseCase } from './application/services/create-parking-lots.use-case';
import { DeleteParkingLotUseCase } from './application/services/delete-parking-lot.use-case';
import { FindParkingLotUseCase } from './application/services/find-parking-lot.use-case';
import { UpdateParkingLotUseCase } from './application/services/update-parking-lot.use-case';
import { ParkingLotPrismaRepository } from './infrastructure/persistence/parking-lot.repository.prisma';

@Module({
  imports: [PrismaModule],
  providers: [
    FindParkingLotUseCase,
    CreateParkingLotsUseCase,
    UpdateParkingLotUseCase,
    DeleteParkingLotUseCase,
    {
      provide: 'ParkingLotRepositoryInterface',
      useClass: ParkingLotPrismaRepository,
    },
  ],
})
export class ParkingLotsModule {}
