import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CategoryUserModule } from '../category-user/category-user.module';
import { ApartmentComplexRoleGuard } from '../common/guards/apartment-complex-role.guard';
import { FindParkingLotsByApartmentUseCase } from '../parking-lots/application/services/find-parking-lots-by-apartment.use-case';
import { ParkingLotPrismaRepository } from '../parking-lots/infrastructure/persistence/parking-lot.repository.prisma';
import { CreatePetsUseCase } from '../pets/application/services/create-pets.use-case';
import { DeletePetUseCase } from '../pets/application/services/delete-pet.use-case';
import { FindPetUseCase } from '../pets/application/services/find-pet.use-case';
import { FindPetsByApartmentUseCase } from '../pets/application/services/find-pets-by-apartment.use-case';
import { UpdatePetUseCase } from '../pets/application/services/update-pet.use-case';
import { PetPrismaRepository } from '../pets/infrastructure/persistence/pet.repository.prisma';
import { PrismaModule } from '../prisma/prisma.module';
import { RoleModule } from '../role/role.module';
import { AssignUserToApartmentUseCase } from '../user-apartment/application/services/assign-user-to-apartment.use-case';
import { DeleteUserApartmentUseCase } from '../user-apartment/application/services/delete-user-apartment.use-case';
import { FindUserApartmentsByApartmentUseCase } from '../user-apartment/application/services/find-user-apartments-by-apartment.use-case';
import { UserApartmentPrismaRepository } from '../user-apartment/infrastructure/persistence/user-apartment.repository.prisma';
import { CreateUsefulRoomsUseCase } from '../useful-rooms/application/services/create-useful-rooms.use-case';
import { DeleteUsefulRoomUseCase } from '../useful-rooms/application/services/delete-useful-room.use-case';
import { FindUsefulRoomUseCase } from '../useful-rooms/application/services/find-useful-room.use-case';
import { FindUsefulRoomsByApartmentUseCase } from '../useful-rooms/application/services/find-useful-rooms-by-apartment.use-case';
import { UpdateUsefulRoomUseCase } from '../useful-rooms/application/services/update-useful-room.use-case';
import { UsefulRoomPrismaRepository } from '../useful-rooms/infrastructure/persistence/useful-room.repository.prisma';
import { UserRoleModule } from '../user-role/user-role.module';
import { UserPrismaRepository } from '../users/infrastructure/persistence/user.repository.prisma';
import { CreateVehiclesUseCase } from '../vehicles/application/services/create-vehicles.use-case';
import { DeleteVehicleUseCase } from '../vehicles/application/services/delete-vehicle.use-case';
import { FindVehicleUseCase } from '../vehicles/application/services/find-vehicle.use-case';
import { FindVehiclesByApartmentUseCase } from '../vehicles/application/services/find-vehicles-by-apartment.use-case';
import { UpdateVehicleUseCase } from '../vehicles/application/services/update-vehicle.use-case';
import { VehiclePrismaRepository } from '../vehicles/infrastructure/persistence/vehicle.repository.prisma';
import { ApartmentPrismaRepository } from './infrastructure/persistence/apartment.repository.prisma';
import { ApartmentsController } from './presentation/apartments.controller';

@Module({
  controllers: [ApartmentsController],
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    RoleModule,
    UserRoleModule,
    CategoryUserModule,
  ],
  providers: [
    ApartmentComplexRoleGuard,
    FindParkingLotsByApartmentUseCase,
    // User apartments
    AssignUserToApartmentUseCase,
    FindUserApartmentsByApartmentUseCase,
    DeleteUserApartmentUseCase,
    // Pets
    FindPetsByApartmentUseCase,
    FindPetUseCase,
    CreatePetsUseCase,
    UpdatePetUseCase,
    DeletePetUseCase,
    // Vehicles
    FindVehiclesByApartmentUseCase,
    FindVehicleUseCase,
    CreateVehiclesUseCase,
    UpdateVehicleUseCase,
    DeleteVehicleUseCase,
    // Useful rooms
    FindUsefulRoomsByApartmentUseCase,
    FindUsefulRoomUseCase,
    CreateUsefulRoomsUseCase,
    UpdateUsefulRoomUseCase,
    DeleteUsefulRoomUseCase,
    {
      provide: 'ApartmentRepositoryInterface',
      useClass: ApartmentPrismaRepository,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserPrismaRepository,
    },
    {
      provide: 'UserApartmentRepositoryInterface',
      useClass: UserApartmentPrismaRepository,
    },
    {
      provide: 'ParkingLotRepositoryInterface',
      useClass: ParkingLotPrismaRepository,
    },
    {
      provide: 'PetRepositoryInterface',
      useClass: PetPrismaRepository,
    },
    {
      provide: 'VehicleRepositoryInterface',
      useClass: VehiclePrismaRepository,
    },
    {
      provide: 'UsefulRoomRepositoryInterface',
      useClass: UsefulRoomPrismaRepository,
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
