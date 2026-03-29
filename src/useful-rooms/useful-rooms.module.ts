import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUsefulRoomsUseCase } from './application/services/create-useful-rooms.use-case';
import { DeleteUsefulRoomUseCase } from './application/services/delete-useful-room.use-case';
import { FindUsefulRoomUseCase } from './application/services/find-useful-room.use-case';
import { FindUsefulRoomsByApartmentUseCase } from './application/services/find-useful-rooms-by-apartment.use-case';
import { UpdateUsefulRoomUseCase } from './application/services/update-useful-room.use-case';
import { UsefulRoomPrismaRepository } from './infrastructure/persistence/useful-room.repository.prisma';

@Module({
  imports: [PrismaModule],
  providers: [
    FindUsefulRoomUseCase,
    FindUsefulRoomsByApartmentUseCase,
    CreateUsefulRoomsUseCase,
    UpdateUsefulRoomUseCase,
    DeleteUsefulRoomUseCase,
    {
      provide: 'UsefulRoomRepositoryInterface',
      useClass: UsefulRoomPrismaRepository,
    },
  ],
})
export class UsefulRoomsModule {}
