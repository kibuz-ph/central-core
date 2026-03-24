import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ApartmentPrismaRepository } from '../apartments/infrastructure/persistence/apartment.repository.prisma';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUsefulRoomsUseCase } from './application/services/create-useful-rooms.use-case';
import { DeleteUsefulRoomUseCase } from './application/services/delete-useful-room.use-case';
import { FindUsefulRoomUseCase } from './application/services/find-useful-room.use-case';
import { FindUsefulRoomsByApartmentUseCase } from './application/services/find-useful-rooms-by-apartment.use-case';
import { UpdateUsefulRoomUseCase } from './application/services/update-useful-room.use-case';
import { UsefulRoomPrismaRepository } from './infrastructure/persistence/useful-room.repository.prisma';
import { UsefulRoomsController } from './presentation/useful-rooms.controller';

@Module({
  controllers: [UsefulRoomsController],
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
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
    {
      provide: 'ApartmentRepositoryInterface',
      useClass: ApartmentPrismaRepository,
    },
  ],
})
export class UsefulRoomsModule {}
